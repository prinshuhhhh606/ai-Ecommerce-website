import express from "express";
import { protect } from "../middleware/middleware";
import {
  getNotifications,
  markAsRead,
  markAllRead
} from "../controller/notificationsController";

const router = express.Router();

// Get logged-in user's notifications
router.get("/", protect, getNotifications);

// Mark notification as read
router.put("/:id/read", protect, markAsRead);
router.put("/read-all", protect, markAllRead);

export default router;
