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


export const getCheckoutSummary = async (req: Request, res: Response) => {
  console.log("====== Checkout API Hit ======");
  console.log("Params:", req.params);

  try {
    const userId = req.params.userId as string;

    console.log("UserId:", userId);

    const summary = await paymentService.getCheckoutSummary(userId);

    return res.status(200).json(summary);
  } catch (error: any) {
    console.error("ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};