import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import CustomError from "../errors/custom.error.js";
import { User } from "../models/user.model.js";
import { uploadFileToCloudinary } from '../utils/cloudinary.js';
import { generateTokens, cookieOptions, generateOTPToken, verifyOTPTokenValidity } from "../utils/tokens.js";
import bcrypt from 'bcryptjs';
import { sendEmail } from "../services/email.service.js";


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, company_name, dob } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() }).exec();

    if (userExists) {
        throw new CustomError(400, "User already exists with this email");
    }

    if (!req.file) {
        throw new CustomError(400, "Avatar is required");
    }

    // Upload avatar to cloudinary
    const avatarResult = await uploadFileToCloudinary(req.file?.path);

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        company_name,
        dob,
        avatar: avatarResult?.secure_url,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User created successfully", {
                user
            })
        );
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select(
        "+password"
    ).exec();


    if (!user) {
        throw new CustomError(404, "User not found");
    }

    // check if user exists
    if (!(await user.comparePassword(password))) {
        throw new CustomError(400, "Invalid credentials");
    }

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);


    const token = generateOTPToken(otp);

    // send OTP to user's email
    const response = await sendEmail(email, otp);

    console.log(user)

    if (response[0].statusCode >= 400) {
        return new CustomError(response[0].statusCode, "OTP Delivery Failed!");
    }

    user.authenticationOTPToken = token;
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Credentials Verified Successfully!", {
                data: null
            })
        );
});


export const verifyAuthOTP = asyncHandler(async (req, res) => {
    const { otp, email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    // check if user exists
    if (!user) {
        throw new CustomError(404, "User not found");
    }

    // check if OTP is valid
    const decodedOTPToken = verifyOTPTokenValidity(user.authenticationOTPToken);

    if (!decodedOTPToken) {
        throw new CustomError(400, "OTP Expired! Please Resend OTP");
    }

    if (otp != decodedOTPToken?.otp) {
        throw new CustomError(400, "Invalid OTP");
    }

    const { accessToken, refreshToken } = generateTokens(user);


    return res
        .status(200)
        .cookie("accessToken", `Bearer ${accessToken}`, { ...cookieOptions })
        .cookie("refreshToken", `Bearer ${refreshToken}`, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .send(
            new ApiResponse(
                200,
                "OTP Verified Successfully!",
                { status: "success" }
            )
        );
});


export const resendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    // check if user exists
    if (!user) {
        throw new CustomError(404, "User not found");
    }

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpToken = await bcrypt.hash(otp.toString(), 12);

    // send OTP to user's email
    const response = await sendEmail(email, otp);

    if (response[0].statusCode >= 400) {
        return new CustomError(response[0].statusCode, "OTP Delivery Failed!");
    }

    user.authenticationOTPToken = otpToken;
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Credentials Verified Successfully!", {
                data: null
            })
        )
});

export const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .cookie("accessToken", "", { ...cookieOptions, maxAge: 0 })
        .cookie("refreshToken", "", { ...cookieOptions, maxAge: 0 })
        .json({
            status: "success",
            message: "User logged out successfully",
        });
});

export const getUser = asyncHandler(async (req, res) => {
    const { _id } = req?.user;

    const user = await User.findById(_id).select("name email avatar company_name dob").exec();

    if (!user) {
        throw new CustomError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User details fetched successfully", user));
});

export const deleteUserAccount = asyncHandler(async (req, res) => {

    console.log("req?.user?._id: ", req?.user?._id);

    const user = await User.findById(req?.user?._id).exec();

    if (!user) {
        throw new CustomError(404, "User not found");
    }

    const deletedUser = await User.deleteOne({ _id: req?.user?._id }).select("name email avatar company_name dob").exec();

    if (!deletedUser) {
        throw new CustomError(404, "User not found");
    }

    res
        .status(200)
        .cookie("accessToken", "", { ...cookieOptions, maxAge: 0 })
        .cookie("refreshToken", "", { ...cookieOptions, maxAge: 0 })
        .json(
            new ApiResponse(200, "User account deleted successfully", deletedUser)
        );
});


