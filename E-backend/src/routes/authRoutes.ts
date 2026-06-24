import express from "express";
import { protect } from "../middleware/middleware";
import { register, login,getProfile } from "../controller/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect,getProfile);

export default router;
