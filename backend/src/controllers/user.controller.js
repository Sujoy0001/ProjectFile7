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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Get environment credentials
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;
    const developerEmail = process.env.DEVELOPER_EMAIL;
    const developerPassword = process.env.DEVELOPER_PASSWORD;

    // Verify credentials against environment values
    const isUser = email === userEmail && password === userPassword;
    const isDeveloper = email === developerEmail && password === developerPassword;
    
    if (!isUser && !isDeveloper) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Determine user role (won't be stored in DB)
    const role = isDeveloper ? "developer" : "user";

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
        // User doesn't exist - create new user
        user = await User.create({
            email,
            password // Hashed by pre-save hook
        });
    } else {
        // User exists - verify password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials");
        }
    }

    // Generate tokens with your existing function
    const { accessToken, refereshToken } = await accessAndRefreshTokenGenrator(user._id);

    // Get user without sensitive data
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookies and send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refereshToken", refereshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refereshToken,
                    role // Include role in response
                },
                "Authentication successful"
            )
        );
});

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
    loginUser,
    currentUser,
    logOutUser
}