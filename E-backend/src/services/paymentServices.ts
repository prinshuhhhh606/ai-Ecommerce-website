import {
  PaymentRequest,
  PaymentResponse,
  PaymentStatus,
} from "../models/paymentModel";

export class PaymentService {
  createPayment(data: PaymentRequest): PaymentResponse {
    return {
      success: true,
      paymentId: "PAY_" + Date.now(),
      status: PaymentStatus.SUCCESS,
      amount: data.amount,
      transactionDate: new Date(),
      message: "Payment Successful",
    };
  }
}
