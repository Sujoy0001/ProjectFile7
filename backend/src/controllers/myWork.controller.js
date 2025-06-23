import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { MyWork } from "../models/myWork.model.js";
import { Image } from "../models/images.model.js";

const uploadImage = asyncHandler(async (req, res) => {
    const { title, description, titleImg } = req.body;

    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required");
    }

    // Check if image file is uploaded
    if (!req.file) {
        throw new ApiError(400, "Image file is required");
    }
    
    // Get the uploaded file path
    const imagePath = req.file.path;
    
    // Create new image document
    const image = await Image.create({
        url: imagePath,
        titleImg: titleImg || req.file.originalname,
        description: description || "",
    });

    if (!image) {
        throw new ApiError(500, "Failed to create image document");
    }

    // Create new MyWork document
    const myWork = await MyWork.create({
        image: image._id,
        title: title || "other"
    });

    if (!myWork) {
        throw new ApiError(500, "Failed to create MyWork document");
    }
    
    // Update the image with MyWork reference
    image.myWork = myWork._id;
    await image.save();
    
    return res.status(201).json(
        new ApiResponse(201, { myWork, image }, "Image uploaded successfully")
    );
});

// Delete My Work image
const deleteImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "My Work ID is required");
    }
    
    // Find and delete the MyWork document
    const myWork = await MyWork.findByIdAndDelete(id);
    
    if (!myWork) {
        throw new ApiError(404, "My Work not found");
    }
    
    // Find and delete the associated image
    const image = await Image.findByIdAndDelete(myWork.image);
    if (!image) {
        throw new ApiError(404, "Image not found");
    }
    
    // Note: In a real application, you would also want to delete the actual image file from storage
    
    return res.status(200).json(
        new ApiResponse(200, {}, "My Work image deleted successfully")
    );
});

// Edit My Work image details
const editImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titleImg, description } = req.body;
    if (!id) {
        throw new ApiError(400, "My Work ID is required");
    }

    if (!titleImg && !description) {
        throw new ApiError(400, "At least one field (title or description) is required");
    }

    // Find the MyWork document
    const myWork = await MyWork.findById(id).populate("image");
    
    if (!myWork) {
        throw new ApiError(404, "My Work not found");
    }
    
    // Update only the image's title and description
    const updatedImage = await Image.findByIdAndUpdate(
        myWork.image._id,
        { 
            titleImg: titleImg || myWork.image.titleImg,
            description: description || myWork.image.description
        },
        { new: true }
    );
    
    return res.status(200).json(
        new ApiResponse(200, { myWork, image: updatedImage }, "Image details updated successfully")
    );
});

export {
    uploadImage, 
    deleteImage, 
    editImage
};