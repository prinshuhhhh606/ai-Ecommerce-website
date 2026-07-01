import express from "express";
import { protect } from "../middleware/middleware";
import { getRewards } from "../controller/rewardController";

const router = express.Router();

router.get("/", protect, getRewards);

export default router;
