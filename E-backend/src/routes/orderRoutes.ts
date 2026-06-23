import { Router } from "express";
import Order from "../models/order";

const router = Router();

/* CREATE ORDER */
router.post("/orders", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // 10% Developer Commission
    const platformCommission = totalAmount * 0.1;

    // 90% Shopkeeper Share
    const shopkeeperAmount = totalAmount - platformCommission;

    const order = await Order.create({
      items,
      totalAmount,

      platformCommission,
      shopkeeperAmount,

      paymentStatus: "Success", // Razorpay/Stripe ke baad update kar sakte ho
      settlementStatus: "Pending",

      status: "Pending",
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ORDER ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

/* GET ALL ORDERS */
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("GET ORDERS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

/* GET SINGLE ORDER */
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("GET ORDER ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
});

/* UPDATE ORDER STATUS */
router.put("/orders/:id/status", async (req, res) => {
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

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

/* UPDATE SETTLEMENT STATUS */
router.put("/orders/:id/settlement", async (req, res) => {
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

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("SETTLEMENT ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to update settlement",
    });
  }
});

/* DELETE ORDER */
router.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found in DB",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ORDER ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
});

/* DASHBOARD / EARNINGS */
router.get("/earnings", async (req, res) => {
  try {
    const orders = await Order.find();

    const totalSales = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0,
    );

    const totalOrders = orders.length;

    const totalCommission = orders.reduce(
      (sum, order) => sum + (order.platformCommission || 0),
      0,
    );

    const totalShopkeeperAmount = orders.reduce(
      (sum, order) => sum + (order.shopkeeperAmount || 0),
      0,
    );

    const successfulPayments = orders.filter(
      (order) => order.paymentStatus === "Success",
    ).length;

    const pendingSettlements = orders.filter(
      (order) => order.settlementStatus === "Pending",
    ).length;

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,

      totalSales,
      totalOrders,

      totalCommission,
      totalShopkeeperAmount,

      successfulPayments,
      pendingSettlements,

      recentOrders,
    });
  } catch (error) {
    console.log("EARNINGS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
});

export default router;
