import mongoose from "mongoose";
import Cart from "../models/cartModel";

export class CartService {
  async addToCart(userId: string, productId: string, quantity: number) {
    const objectId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ userId });

    // 🟢 If cart doesn't exist
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId: objectId,
            quantity,
          },
        ],
      });
    }
    // 🟢 If cart exists
    else {
      const itemIndex = cart.items.findIndex(
        (i: any) => i.productId.toString() === productId,
      );

      // 🔁 If product already in cart → update quantity
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      }
      // ➕ If new product → push to cart
      else {
        cart.items.push({
          productId: objectId,
          quantity,
        });
      }
    }

    await cart.save();
    return cart;
  }

  // cartService.ts
  async clearCart(userId: string) {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [];
    await cart.save();

    return { message: "Cart cleared successfully" };
  }
}
