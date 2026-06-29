import { Request, Response } from "express";
import Coupon from "../models/couponModel";
import { CouponService } from "../services/couponServices";

// Create Coupon
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.create(req.body);

    return res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Coupons
export const getAllCoupons = async (_req: Request, res: Response) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// APPLY COUPON (USING YOUR SERVICE CLASS)
export const applyCoupon = async (req: Request, res: Response) => {
  try {
    
    console.log("BODY =>", req.body);
    console.log("CODE =>", req.body.code);
    console.log("ORDER AMOUNT =>", req.body.orderAmount);
    const { code, orderAmount } = req.body;

    const amount = Number(orderAmount);

    if (!code || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const service = new CouponService();

    const result = await service.applyCoupon(code, amount);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// OPTIONAL: APPLY + INCREASE USAGE (RECOMMENDED FOR REAL SYSTEM)
export const applyAndUseCoupon = async (req: Request, res: Response) => {
  try {
    const { code, orderAmount } = req.body;

    const amount = Number(orderAmount);

    if (!code || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    const service = new CouponService();

    const result = await service.applyCoupon(code, amount);

    // increase usage after successful validation
    await service.increaseCouponUsage(code);

    return res.status(200).json({
      success: true,
      ...result,
      message: "Coupon applied successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE COUPON
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
