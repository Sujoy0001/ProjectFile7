import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {MyWork} from "../models/myWork.model.js";
import { Image } from "../models/images.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { myWorkSubcats,collegeWorkSubcats } from "../../../const.js";

const uploadMyWorkImage = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required");
    }

    // Check if image file is uploaded
    if (!req.file) {
        throw new ApiError(400, "Image file is required");
    }

    const fileMimeType = req.file.mimetype;
    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    if (!base64File) {
        throw new ApiError(400, "File is required")
    }
    let imageUrl = "";
    if (fileMimeType.startsWith("image/")) {
        const postImage = await uploadOnCloudinary(base64File, "image")
        if (!postImage.url) {
            throw new ApiError(500, "Something went wrong")
        }
        imageUrl = postImage.url
    } else {
        throw new ApiError(400, "Only image files are allowed");
    }

    // Create new image document with Cloudinary URL
    const image = await Image.create({
        url: imageUrl,
        description: description || ""
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
        new ApiResponse(201, { myWork, image }, "My Work image uploaded successfully")
    );
});

// Delete My Work image
const deleteMyWorkImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid post id");
    }

    // Find the MyWork document and populate the image
    const myWork = await MyWork.findById(id).populate("image");

    if (!myWork) {
        throw new ApiError(404, "My Work not found");
    }

    if (myWork.image) {
        const publicId = getPublicId(myWork.image.url);
        await deleteFromCloudinary(publicId, "image");
    }

    // Delete the associated image document
    const image = await Image.findByIdAndDelete(myWork.image._id);
    if (!image) {
        throw new ApiError(404, "Image not found");
    }

    // Finally, delete the MyWork document
    await MyWork.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "My Work image deleted successfully")
    );
});

// Edit My Work image details
const editMyWorkImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid post id");
    }

    // Find the MyWork document
    const myWork = await MyWork.findById(id).populate("image");

    if (!myWork) {
        throw new ApiError(404, "My Work not found");
    }

    // Handle file upload if a new file is provided
    let cloudinaryResponse;
    let newPublicId;

    if (req.file) {

        const fileMimeType = req.file.mimetype;
        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        if (!base64File) {
            throw new ApiError(400, "File is required")
        }
        // Upload new image to Cloudinary
        const postImage = await uploadOnCloudinary(base64File, "image")
        if (!postImage.url) {
            throw new ApiError(500, "Something went wrong")
        }

        if (!postImage || !postImage.url) {
            throw new ApiError(500, "Failed to upload new image to Cloudinary");
        }

        cloudinaryResponse = postImage.url;

        // Delete old image from Cloudinary
        if (myWork.image?.url) {
            const publicId = getPublicId(myWork.image.url);
            await deleteFromCloudinary(publicId, "image");
        }
    }

    // Update the image document
    const updateData = {
        description: description || myWork.image.description
    };

    if (cloudinaryResponse) {
        updateData.url = cloudinaryResponse;
    }

    const updatedImage = await Image.findByIdAndUpdate(
        myWork.image._id,
        updateData,
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, { myWork }, "My Work image details updated successfully")
    );
});


const getMyWorkByTitle = asyncHandler(async (req, res) => {
    const { title } = req.params;

    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required");
    }

    // Validate the title against the enum values
    const validTitles = myWorkSubcats || ["design", "logo_design", "mask_making", "book_cover", "other"];
    if (!validTitles.includes(title)) {
        throw new ApiError(400, "Invalid title value");
    }

    // Find all MyWork entries with the specified title and populate the image details
    const myWorks = await MyWork.find({ title })
        .populate({
            path: "image",
            select: "url description" // Only include these fields from Image
        })
        .sort({ createdAt: -1 }); // Sort by newest first

    if (myWorks.length === 0) {
        throw new ApiError(404, `No My Work items found with title '${title}'`);
    }

    return res.status(200).json(
        new ApiResponse(200, myWorks, `My Work items with title '${title}' fetched successfully`)
    );
});


export {
    uploadMyWorkImage as uploadImage,
    deleteMyWorkImage as deleteImage,
    editMyWorkImage as editImage,
    getMyWorkByTitle as getMyWorkByTitle
};