import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { options } from "../constants.js";

const accessAndRefreshTokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong in token generation");
  }
};

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

  // Check if user exists in DB
  let user = await User.findOne({ email });

  if (!user) {
    // User doesn't exist - create new user
    user = await User.create({
      email,
      password, // Hashed by pre-save hook
      role
    });
  } else {
    // User exists - verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }
  }

  // Generate tokens
  const { accessToken, refreshToken } = await accessAndRefreshTokenGenerator(user._id);

  // Get user without sensitive data
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // Set cookies and send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
          role
        },
        "Authentication successful"
      )
    );
});

const currentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user || null, "User fetched successfully"));
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

export {
  loginUser,
  currentUser,
  logOutUser
};
