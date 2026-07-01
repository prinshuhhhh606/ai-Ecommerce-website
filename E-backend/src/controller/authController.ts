import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken";
import { generateReferralCode } from "../utils/generateReferralCode";
import mongoose from "mongoose";

export const register = async (req: any, res: any) => {
  console.log("===== REGISTER API CALLED =====");
  try {
    const { name, email, password, referralCode: usedReferralCode } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code for new user
    const referralCode = generateReferralCode(name);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode,
      referredBy: usedReferralCode || null,
    });

    console.log("Used Referral Code:", usedReferralCode);

    // Referral reward

    // Verify Referral Code
    if (usedReferralCode && usedReferralCode.trim() !== "") {
      console.log("Used Referral Code:", usedReferralCode);
      const referrer = await User.findOne({
        referralCode: usedReferralCode.trim(),
      });

      console.log("Referrer Found:", referrer);

      // ❌ Invalid Referral Code
      if (!referrer) {
        return res.status(400).json({
          success: false,
          message: "Invalid Referral Code",
        });
      }

      // ✅ Valid Referral Code → Give Reward
      referrer.wallet.balance += 50;
      referrer.wallet.credit += 50;

      await referrer.save();

      user.wallet.balance += 50;
      user.wallet.credit += 50;

      user.referralRewardGiven = true;
    }

    // Save user
    await user.save();

    // Generate JWT
    const token = generateToken(user._id.toString());

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
        referredBy: user.referredBy,
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



export const verifyReferral = async (req: any, res: any) => {
  try {
   const { referralCode } = req.body;

   const code = referralCode?.trim();

    // Referral code empty
    if (!referralCode) {
      return res.status(400).json({
        success: false,
        message: "Referral Code is required",
      });
    }

    // Database check
    const referrer = await User.findOne({
      referralCode: referralCode,
    });

    // Invalid referral code
    if (!referrer) {
      return res.status(404).json({
        success: false,
        message: "Invalid Referral Code",
      });
    }

    // Valid referral code
    return res.status(200).json({
      success: true,
      message: "Referral Code Applied Successfully",
      referrer: {
        id: referrer._id,
        name: referrer.name,
        referralCode: referrer.referralCode,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGOUT
export const logout = async (req: any, res: any) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};