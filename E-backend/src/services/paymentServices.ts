import Payment from "../models/paymentModel";
import Product from "../models/productModel";
import { OrderService } from "./orderServices";
import { CouponService } from "./couponServices";
import {
  PaymentRequest,
  PaymentStatus,
  PaymentResponse,
} from "../types/paymentTypes";

export class PaymentService {
  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    console.log("🔥 PaymentService is running");

    let totalAmount = 0;

    // 1. Calculate Total
    for (const item of data.items) {
      const product: any = await Product.findById(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      totalAmount += product.price * item.quantity;
    }

    console.log("TOTAL AMOUNT:", totalAmount);

    // 2. Coupon Logic
    let finalAmount = totalAmount;
    let discount = 0;
    let couponCode: string | null = null;

    if (data.couponCode && data.couponCode.trim()) {
      const couponService = new CouponService();

      const coupon = await couponService.applyCoupon(
        data.couponCode,
        totalAmount,
      );

      console.log("COUPON FOUND:", coupon);

      if (coupon) {
        finalAmount = coupon.finalAmount;
        discount = coupon.discount;
        couponCode = data.couponCode;

        await couponService.increaseCouponUsage(data.couponCode);
      }

      console.log("FINAL AMOUNT:", finalAmount);
      console.log("DISCOUNT:", discount);
    }

    // 3. Commission
    const developerAmount = finalAmount * 0.1;
    const shopkeeperAmount = finalAmount * 0.9;

    // 4. Save Payment
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

    // 5. CREATE ORDER
    const orderService = new OrderService();

    await orderService.createOrder({
      items: data.items,
      totalAmount: finalAmount,
      developerAmount,
      shopkeeperAmount,
      paymentId: payment.paymentId,
      couponCode: couponCode,
    });

    // 6. RESPONSE
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
}
