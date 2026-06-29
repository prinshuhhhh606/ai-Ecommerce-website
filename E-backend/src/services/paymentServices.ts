import Payment from "../models/paymentModel";
import Product from "../models/productModel";
import Cart from "../models/cartModel";
import { OrderService } from "./orderServices";
import { CouponService } from "./couponServices";
import {
  PaymentRequest,
  PaymentStatus,
  PaymentResponse,
} from "../types/paymentTypes";

export class PaymentService {
  // =========================
  // CREATE PAYMENT (unchanged)
  // =========================
  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    let totalAmount = 0;

    for (const item of data.items) {
      const product: any = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      totalAmount += product.price * item.quantity;
    }

    let finalAmount = totalAmount;
    let discount = 0;
    let couponCode: string | null = null;

    if (data.couponCode?.trim()) {
      const couponService = new CouponService();

      const coupon = await couponService.applyCoupon(
        data.couponCode,
        totalAmount,
      );

      if (coupon) {
        finalAmount = coupon.finalAmount;
        discount = coupon.discount;
        couponCode = data.couponCode;

        await couponService.increaseCouponUsage(data.couponCode);
      }
    }

    const developerAmount = finalAmount * 0.1;
    const shopkeeperAmount = finalAmount * 0.9;

    const payment: any = await Payment.create({
      paymentId: "PAY_" + Date.now(),
      amount: finalAmount,
      paymentMethod: data.paymentMethod,
      customerName: data.customer.name,
      customerEmail: data.customer.email,
      status: PaymentStatus.SUCCESS,
      developerAmount,
      shopkeeperAmount,
    });

    const orderService = new OrderService();

    await orderService.createOrder({
      items: data.items,
      totalAmount: finalAmount,
      developerAmount,
      shopkeeperAmount,
      paymentId: payment.paymentId,
      couponCode,
    });

    return {
      success: true,
      paymentId: payment.paymentId,
      status: payment.status,
      amount: payment.amount,
      transactionDate: payment.createdAt,
      message: "Payment Successful",

      originalAmount: totalAmount,
      discount,
      couponCode,
      developerAmount,
      shopkeeperAmount,
    } as any;
  }

  // =========================
  // CART BASED CHECKOUT SUMMARY (NEW)
  // =========================
  async getCheckoutSummary(userId: string, couponCode?: string) {
    let totalAmount = 0;
    let discount = 0;
    let payableAmount = 0;

    const items: any[] = [];

    // 1. Get cart
    console.log("Searching Cart For User:", userId);
    const cart = await Cart.findOne({ userId });


console.log("Cart Found:", cart);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // 2. Get products in single query (FAST)
    const productIds = cart.items.map((i: any) => i.productId);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    console.log("Cart Items:", cart.items);

    // 3. Build items + calculate total
    for (const cartItem of cart.items) {
      const product: any = products.find(
        (p: any) => p._id.toString() === cartItem.productId.toString(),
      );


        console.log("Product:", product.title);
        console.log("Price:", product.price);
        console.log("Quantity:", cartItem.quantity);


      if (!product) {
        throw new Error("Product not found");
      }

      const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      console.log("FINAL TOTAL:", totalAmount);

     items.push({
       productId: product._id,
       title: product.title,
       image: product.image,
       description: product.description,
       category: product.category,
       price: product.price,
       quantity: cartItem.quantity,
     });
    }

    // 4. Coupon service
    if (couponCode && couponCode.trim()) {
      const couponService = new CouponService();

      const coupon = await couponService.applyCoupon(couponCode, totalAmount);

      if (coupon) {
        discount = coupon.discount;
        payableAmount = coupon.finalAmount;
      }
    }
    // 6. Response
    return {
      success: true,
      items,
      totalAmount,
      discount,
      payableAmount,
    };
  }
}
