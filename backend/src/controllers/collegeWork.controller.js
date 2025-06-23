import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { CollegeWork } from "../models/collegeWork.model.js";
import { Image } from "../models/images.model.js";

const uploadCollegeWorkImage = asyncHandler(async (req, res) => {
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

    // Create new CollegeWork document
    const collegeWork = await CollegeWork.create({
        image: image._id,
        title: title || "other"
    });

    if (!collegeWork) {
        throw new ApiError(500, "Failed to create CollegeWork document");
    }
    
    // Update the image with CollegeWork reference
    image.collegeWork = collegeWork._id;
    await image.save();
    
    return res.status(201).json(
        new ApiResponse(201, { collegeWork, image }, "College Work image uploaded successfully")
    );
});

// Delete College Work image
const deleteCollegeWorkImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "College Work ID is required");
    }
    
    // Find and delete the CollegeWork document
    const collegeWork = await CollegeWork.findByIdAndDelete(id);
    
    if (!collegeWork) {
        throw new ApiError(404, "College Work not found");
    }
    
    // Find and delete the associated image
    const image = await Image.findByIdAndDelete(collegeWork.image);
    if (!image) {
        throw new ApiError(404, "Image not found");
    }
    
    // Note: In a real application, you would also want to delete the actual image file from storage
    
    return res.status(200).json(
        new ApiResponse(200, {}, "College Work image deleted successfully")
    );
});

// Edit College Work image details
const editCollegeWorkImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titleImg, description } = req.body;
    if (!id) {
        throw new ApiError(400, "College Work ID is required");
    }

    if (!titleImg && !description) {
        throw new ApiError(400, "At least one field (title or description) is required");
    }

    // Find the CollegeWork document
    const collegeWork = await CollegeWork.findById(id).populate("image");
    
    if (!collegeWork) {
        throw new ApiError(404, "College Work not found");
    }
    
    // Update only the image's title and description
    const updatedImage = await Image.findByIdAndUpdate(
        collegeWork.image._id,
        { 
            titleImg: titleImg || collegeWork.image.titleImg,
            description: description || collegeWork.image.description
        },
        { new: true }
    );
    
    return res.status(200).json(
        new ApiResponse(200, { collegeWork, image: updatedImage }, "College Work image details updated successfully")
    );
});

export {
    uploadCollegeWorkImage as uploadImage, 
    deleteCollegeWorkImage as deleteImage, 
    editCollegeWorkImage as editImage
};