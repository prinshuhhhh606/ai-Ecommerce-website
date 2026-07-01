import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken";
import { generateReferralCode } from "../utils/generateReferralCode";
import mongoose from "mongoose";
export const register = async (req: any, res: any) => {
  try {
    const {
      name,
      email,
      password,
      referralCode: usedReferralCodeRaw,
    } = req.body;

    const usedReferralCode = usedReferralCodeRaw?.trim();

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate New User Referral Code
    const referralCode = generateReferralCode(name);

    // Find Referrer
    let referrer: any = null;

    if (usedReferralCode) {
      if (usedReferralCode === referralCode) {
        return res.status(400).json({
          success: false,
          message: "You cannot use your own referral code",
        });
      }

      referrer = await User.findOne({
        referralCode: usedReferralCode,
      });

      if (!referrer) {
        return res.status(400).json({
          success: false,
          message: "Invalid Referral Code",
        });
      }
    }

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode,
      referredBy: referrer ? referrer._id : null,
      wallet: {
        balance: 0,
        credit: 0,
        debit: 0,
      },
      referralRewardGiven: false,
    });

    // Give Reward
    if (referrer) {
      referrer.wallet.balance += 50;
      referrer.wallet.credit += 50;

      user.wallet.balance += 50;
      user.wallet.credit += 50;

      user.referralRewardGiven = true;

      await referrer.save();
    }

    // Save User
    await user.save();

    // Generate Token
    const token = generateToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      rewardApplied: user.referralRewardGiven,
      rewardAmount: user.wallet.credit,
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