import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from '../models/user.model.js'
import { options } from "../constants.js";

const accessAndRefreshTokenGenrator = async (usedId) => {
    try {
        const user = await User.findById(usedId)
        const accessToken = user.generateAccessToken()
        const refereshToken = user.generateRefreshToken()

        user.refreshToken = refereshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refereshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong in token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const email = process.env.EMAIL
    const password = process.env.PASSWORD
    if ([email, password].some((data) => data?.trim() === "")) {
        throw new ApiError(400, "all fields are requerd")
    }
    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if (existedUser) {
        throw new ApiError(400, "user alredy existd")
    }
    const user = await User.create({
        email,
        password
    })
    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createUser) {
        throw new ApiError(500, "something went wrong")
    }
    return res.status(200).json(new ApiResponse(200, createUser, "register successfuly"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!(email)) {
        throw new ApiError(400, "all fields are requerd")
    }
    const user = await User.findOne({
        $or: [{ email }]
    })
    if (!user) {
        throw new ApiError(404, "not found")
    }
    const isPassword = await user.isPasswordCorrect(password)
    if (!isPassword) {
        throw new ApiError(401, "Bad request")
    }
    const { accessToken, refereshToken } = await accessAndRefreshTokenGenrator(user._id)
    const loginUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refereshToken", refereshToken, options)
        .json(new ApiResponse(200, { user: loginUser, refereshToken, accessToken }, "login successfully"))
})

const currentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user ? req.user : null, "successfully"))
})

const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    },
        {
            new: true
        })
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refereshToken", options)
        .json(new ApiResponse(200, {}, "logout successfully"))
})


export {
    registerUser,
    loginUser,
    currentUser,
    logOutUser
}