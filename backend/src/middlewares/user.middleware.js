import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyLogin = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Unauthorized")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Unauthorized")
    }
});

export { verifyLogin };