import { Request, Response } from "express";
import User from "../models/userModel";
import Transaction from "../models/transactionModel";

// Get Wallet Summary
export const getWallet = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      wallet: user.wallet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Transactions
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({
      userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Add Money
export const addMoney = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.wallet.balance += Number(amount);
    user.wallet.credit += Number(amount);

    await user.save();

   await Transaction.create({
     userId: user._id,
     type: "Credit",
     amount: Number(amount),
     description: "Wallet Topup",
     status: "Success",
   });

    res.status(200).json({
      success: true,
      message: "Money Added Successfully",
      wallet: user.wallet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Pay From Wallet
export const payFromWallet = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

  if (user.wallet.balance < Number(amount)) {
    return res.status(400).json({
      success: false,
      message: "Insufficient Balance",
    });
  }

    user.wallet.balance -= Number(amount);
    user.wallet.debit += Number(amount);

    await user.save();

   await Transaction.create({
     userId: user._id,
     type: "Debit",
     amount: Number(amount),
     description: "Order Payment",
     status: "Success",
   });
    res.status(200).json({
      success: true,
      message: "Payment Successful",
      wallet: user.wallet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
