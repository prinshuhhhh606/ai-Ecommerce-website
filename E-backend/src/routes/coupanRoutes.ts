import express from "express";
import {
  createCoupon,
  getAllCoupons,
  applyCoupon,
  deleteCoupon,
} from "../controller/couponController";

const router = express.Router();

// Create Coupon
router.post("/create", createCoupon);

// Get All Coupons
router.get("/", getAllCoupons);

// Apply Coupon
router.post("/apply", applyCoupon);

// Delete Coupon
router.delete("/:id", deleteCoupon);

export default router;
