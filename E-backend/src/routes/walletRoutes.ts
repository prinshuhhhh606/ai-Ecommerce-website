import express from "express";
import {
  getWallet,
  getTransactions,
  addMoney,
  payFromWallet,
} from "../controller/walletController";

const router = express.Router();

// Wallet Summary
router.get("/:userId", getWallet);

// Transactions
router.get("/transactions/:userId", getTransactions);

// Fake Wallet Payment
router.post("/wallet-payment", (req, res) => {
  const { amount } = req.body;

  res.json({
    success: true,
    paymentId: `WALLET_${Date.now()}`,
    amount,
    status: "SUCCESS",
    createdAt: new Date(),
  });
});

// Add Money
router.post("/add-money/:userId", addMoney);

// Wallet Payment for Order
router.post("/pay/:userId", payFromWallet);

export default router;
