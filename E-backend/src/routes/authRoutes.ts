import express from "express";
import { protect } from "../middleware/middleware";
import {
  register,
  login,
  getProfile,
  getAccountSuccess,
} from "../controller/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);

// New Route
router.get("/account-success", protect, getAccountSuccess);

export default router;
