import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { CollegeWork } from "../models/collegeWork.model.js";
import { Image } from "../models/images.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { myWorkSubcats,collegeWorkSubcats } from "../../../const.js";

const uploadCollegeWorkImage = asyncHandler(async (req, res) => {
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
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid post id");
    }

    // Find the CollegeWork document and populate the image
    const collegeWork = await CollegeWork.findById(id).populate("image");

    if (!collegeWork) {
        throw new ApiError(404, "College Work not found");
    }

    if (collegeWork.image) {
        const publicId = getPublicId(collegeWork.image.url);
        await deleteFromCloudinary(publicId, "image");
    }

    // Delete the associated image document
    const image = await Image.findByIdAndDelete(collegeWork.image._id);
    if (!image) {
        throw new ApiError(404, "Image not found");
    }

    // Finally, delete the CollegeWork document
    await CollegeWork.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "College Work image deleted successfully")
    );
});

// Edit College Work image details
const editCollegeWorkImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid post id");
    }

    // Find the CollegeWork document
    const collegeWork = await CollegeWork.findById(id).populate("image");

    if (!collegeWork) {
        throw new ApiError(404, "College Work not found");
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
        if (collegeWork.image?.url) {
            const publicId = getPublicId(collegeWork.image.url);
            await deleteFromCloudinary(publicId, "image");
        }
    }

    // Update the image document
    const updateData = {
        description: description || collegeWork.image.description
    };

    if (cloudinaryResponse) {
        updateData.url = cloudinaryResponse;
    }

    const updatedImage = await Image.findByIdAndUpdate(
        collegeWork.image._id,
        updateData,
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, { collegeWork }, "College Work image details updated successfully")
    );
});


const getCollegeWorkByTitle = asyncHandler(async (req, res) => {
    const { title } = req.params;

    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required");
    }

    // Validate the title against the enum values
    const validTitles = collegeWorkSubcats || ["model_making", "sand_art", "other"];
    if (!validTitles.includes(title)) {
        throw new ApiError(400, "Invalid title value");
    }

    // Find all CollegeWork entries with the specified title and populate the image details
    const collegeWorks = await CollegeWork.find({ title })
        .populate({
            path: "image",
            select: "url description" // Only include these fields from Image
        })
        .sort({ createdAt: -1 }); // Sort by newest first

    if (collegeWorks.length === 0) {
        throw new ApiError(404, `No College Work items found with title '${title}'`);
    }

    return res.status(200).json(
        new ApiResponse(200, collegeWorks, `College Work items with title '${title}' fetched successfully`)
    );
});


export {
    uploadCollegeWorkImage as uploadImage,
    deleteCollegeWorkImage as deleteImage,
    editCollegeWorkImage as editImage,
    getCollegeWorkByTitle as getCollegeWorkByTitle
};