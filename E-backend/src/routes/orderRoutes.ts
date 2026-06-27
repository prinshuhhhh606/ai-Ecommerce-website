import { Router } from "express";
import Order from "../models/order";

import {
  createOrder,
  getOrders,
  getOrderById,
  getEarnings,
} from "../controller/orderController";

const router = Router();

console.log("ORDERS FILE LOADED");

// Test Route
router.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Orders route working",
  });
});

// ===================== CREATE ORDER =====================
router.post("/", createOrder);

// ===================== GET DASHBOARD =====================
router.get("/earnings", getEarnings);

// ===================== GET ALL ORDERS =====================
router.get("/", getOrders);

// ===================== GET SINGLE ORDER =====================
router.get("/:id", getOrderById);

// ===================== UPDATE ORDER STATUS =====================
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

// ===================== UPDATE SETTLEMENT =====================
router.put("/:id/settlement", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        settlementStatus: "Paid",
      },
      {
        new: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("SETTLEMENT ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update settlement",
    });
  }
});

// ===================== DELETE ORDER =====================
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found in DB",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ORDER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
});

export default router;
