import express from "express";
import {
  getWallet,
  getTransactions,
  addMoney,
  payFromWallet,
} from "../controller/walletController";

const router = express.Router();

router.get("/:userId", getWallet);
router.get("/transactions/:userId", getTransactions);
router.post("/add-money/:userId", addMoney);
router.post("/pay/:userId", payFromWallet);

export default router;
