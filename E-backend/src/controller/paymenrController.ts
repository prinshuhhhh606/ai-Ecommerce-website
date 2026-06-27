import { Request, Response } from "express";
import { PaymentService } from "../services/paymentServices";

const paymentService = new PaymentService();

export const makePayment = async (req: Request, res: Response) => {
  console.log("🔥 Controller is running");
  console.log(req.body);

  try {
    const result = await paymentService.createPayment(req.body);

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Payment failed",
    });
  }
};
