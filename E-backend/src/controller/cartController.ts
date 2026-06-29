import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { CartService } from "../services/cartServices";

// ========================
// ADD TO CART
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, userId } = req.body;

    console.log("BODY:", req.body);

    if (!productId) {
      return res.status(400).json({ message: "productId missing" });
    }

    if (!userId) {
      return res.status(400).json({ message: "userId missing" });
    }

    const qty = Number(quantity || 1); // 🔥 FIX IMPORTANT

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity || 0) + qty;
    } else {
      cart.items.push({
        productId,
        quantity: qty,
      });
    }

    await cart.save();

    return res.json({
      success: true,
      cart,
    });
  } catch (error: any) {
    console.error("CART ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// GET CART
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart: any = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        totalAmount: 0,
      });
    }

    let totalAmount = 0;

    const items = cart.items
      .map((item: any) => {
        const product = item.productId;
if (!product) return null;

const price = Number(product.price ?? 0);
const qty = Number(item.quantity ?? 0);

const itemTotal = price * qty;
        totalAmount += itemTotal;

        return {
          productId: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: item.quantity,
          itemTotal,
        };
      })
      .filter((item: any) => item !== null);

    return res.status(200).json({
      success: true,
      items,
      totalAmount,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================
// REMOVE FROM CART
// ========================
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const cart: any = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// CLEAR CART
// ========================
const cartService = new CartService();

export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const result = await cartService.clearCart(userId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
