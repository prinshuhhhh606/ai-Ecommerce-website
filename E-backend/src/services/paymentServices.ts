import Payment from "../models/paymentModel";
import { PaymentRequest,PaymentStatus,PaymentResponse } from "../types/paymentTypes";


export class PaymentService {
  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    const developerAmount = data.amount * 0.1;
    const shopkeeperAmount = data.amount * 0.9;

    const payment: any = await Payment.create({
      paymentId: "PAY_" + Date.now(),
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      status: PaymentStatus.SUCCESS,
      developerAmount,
      shopkeeperAmount,
    });
    
    return {
      success: true,
      paymentId: payment.paymentId,
      status: payment.status,
      amount: payment.amount,
      transactionDate: payment.createdAt,
      message: "Payment Successful",
    };
  }
}
