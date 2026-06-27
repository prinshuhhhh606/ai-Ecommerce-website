import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/productModel";
import { CouponService } from "../services/couponServices";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, totalAmount, code } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Items and totalAmount are required",
      });
    }

    let finalAmount = Number(totalAmount);
    let discount = 0;
    let appliedCoupon = null;

    // ================= COUPON =================
    if (code) {
      const service = new CouponService();
      const result = await service.applyCoupon(code, finalAmount);

      discount = result.discount;
      finalAmount = result.finalAmount;
      appliedCoupon = result.couponCode;

      await service.increaseCouponUsage(code);
    }

    // ================= STOCK VALIDATION + UPDATE =================
    for (const item of items) {
     const product: any = await Product.findById(item.productId);

     console.log("PRODUCT:", product);

     if (!product) {
       return res.status(404).json({
         success: false,
         message: "Product not found",
       });
     }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      // reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // ================= AMOUNT SPLIT =================
    const developerAmount = finalAmount * 0.1;
    const shopkeeperAmount = finalAmount - developerAmount;

    // ================= CREATE ORDER =================
    const order = await Order.create({
      items,
      totalAmount,
      discount,
      finalAmount,
      couponCode: appliedCoupon,

      developerAmount,
      shopkeeperAmount,

      paymentStatus: "Success", // fake mode
      settlementStatus: "Pending",
      status: "Confirmed",

      paymentId: "FAKE_" + Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Order placed & stock updated",
      data: order,
    });
  } catch (error: any) {
    console.error("ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
