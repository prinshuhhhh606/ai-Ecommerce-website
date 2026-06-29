import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken";
import mongoose from "mongoose";

// REGISTER
export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    console.log("Request Body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("Checking existing user...");

    console.log("Mongo Ready State:", mongoose.connection.readyState);
    console.log("Model Name:", User.modelName);
    console.log("Collection:", User.collection.name);
    console.log("Checking existing user...");
    console.log("Mongo Ready State:", mongoose.connection.readyState);
    const existingUser = await User.findOne({ email });

    console.log("findOne completed");

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    console.error("REGISTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Request Body:", req.body);
    console.log("Mongo State:", mongoose.connection.readyState);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

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
    console.error("LOGIN ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
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

