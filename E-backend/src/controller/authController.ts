import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken";
import { generateReferralCode } from "../utils/generateReferralCode";
import mongoose from "mongoose";

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    console.log("Request Body:", req.body);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("Mongo Ready State:", mongoose.connection.readyState);
    console.log("Model Name:", User.modelName);
    console.log("Collection:", User.collection.name);

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code
    const referralCode = generateReferralCode(name);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode,
    });

    // Generate JWT Token
    const token = generateToken(user.id);

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      referralCode: user.referralCode,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        wallet: user.wallet,
      },
    });
  } catch (error: any) {
    console.error("REGISTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// LOGIN
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PROFILE
export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ACCOUNT SUCCESS
export const getAccountSuccess = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email referralCode",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account details fetched successfully",
      data: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
