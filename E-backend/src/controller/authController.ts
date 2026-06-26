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

// LOGIN
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    console.log("Mongo Ready State:", mongoose.connection.readyState);
console.log("Model Name:", User.modelName);
console.log("Collection:", User.collection.name);
    console.log("Checking existing user...");
    console.log("Mongo Ready State:", mongoose.connection.readyState);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

  export const getProfile = async (req: any, res: any) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
