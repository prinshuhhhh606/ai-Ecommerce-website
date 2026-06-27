import { Router } from "express";
import { makePayment } from "../controller/paymenrController";

const router = Router();

// CREATE PAYMENT
router.post("/create-payment", makePayment);

// GET PAYMENT
router.get("/payment/:id", (req, res) => {
  res.json({
    success: true,
    paymentId: req.params.id,
    status: "SUCCESS",
    amount: 1000,
  });
});

export default router;
