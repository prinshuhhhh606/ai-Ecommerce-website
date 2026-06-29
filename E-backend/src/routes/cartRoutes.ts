import { Router } from "express";
import mongoose from "mongoose";
import Cart from "../models/cartModel";

import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controller/cartController";

const router = Router();

// ================= CART ROUTES =================

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.post("/remove", removeFromCart);

router.post("/clear", clearCart);

// ================= TEST ROUTE =================

router.get("/test-cart", async (req, res) => {
  try {
    const cart = await Cart.create({
      userId: new mongoose.Types.ObjectId(),
      items: [],
    });

    res.status(201).json({
      success: true,
      message: "Test cart created",
      cart,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
