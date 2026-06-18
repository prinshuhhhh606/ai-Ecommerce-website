import { Router } from "express";
import Order from "../models/order";

const router = Router();

// Create Order
router.post("/orders", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      items,
      totalAmount,
      status: "Pending",
    });

    console.log("ORDER SAVED =>", order);

    res.status(201).json(order);
  } catch (error) {
    console.log("ORDER ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

// Get All Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log("GET ORDERS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

export default router;
