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

// ================= GET ALL ORDERS =================
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE ORDER =================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DASHBOARD / EARNINGS =================
export const getEarnings = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();

    const totalSales = orders.reduce(
      (sum, order: any) => sum + (order.finalAmount || order.totalAmount),
      0
    );

    const totalOrders = orders.length;

    const totalCommission = orders.reduce(
      (sum, order: any) => sum + (order.developerAmount || 0),
      0
    );

    const totalShopkeeperAmount = orders.reduce(
      (sum, order: any) => sum + (order.shopkeeperAmount || 0),
      0
    );

    const successfulPayments = orders.filter(
      (order: any) => order.paymentStatus === "Success"
    ).length;

    const pendingSettlements = orders.filter(
      (order: any) => order.settlementStatus === "Pending"
    ).length;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      totalSales,
      totalOrders,
      totalCommission,
      totalShopkeeperAmount,
      successfulPayments,
      pendingSettlements,
      recentOrders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
