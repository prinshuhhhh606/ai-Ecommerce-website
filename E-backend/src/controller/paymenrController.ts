import { Request, Response } from "express";
import { PaymentService } from "../services/paymentServices";

const paymentService = new PaymentService();

export const makePayment = (req: Request, res: Response) => {
  const result = paymentService.createPayment(req.body);

  res.status(200).json(result);
};
