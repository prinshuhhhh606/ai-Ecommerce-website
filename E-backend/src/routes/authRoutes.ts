import express from "express";
import { protect } from "../middleware/middleware";
import {
  register,
  login,
  getProfile,
  getAccountSuccess,
  verifyReferral,
  logout
} from "../controller/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.post("/logout", protect, logout);

// New Route
router.get("/account-success", protect, getAccountSuccess);
router.post("/verify-referral", verifyReferral);

export default router;
