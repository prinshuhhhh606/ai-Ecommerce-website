import { Router } from "express";

const router = Router();

// CREATE PAYMENT
router.post("/create-payment", (req, res) => {
  const { amount, customer } = req.body;

    
    const developerAmount = amount * 0.1;
    const shopkeeperAmount = amount * 0.9;

    console.log("===== PAYMENT SPLIT =====");
    console.log("Total Payment:", amount);
    console.log("Developer Gets:", developerAmount);
    console.log("Shopkeeper Gets:", shopkeeperAmount);

  res.json({
    success: true,
    paymentId: `PAY_${Date.now()}`,
    amount,
    customer,
    developerAmount,
    shopkeeperAmount,
    status: "SUCCESS",
    createdAt: new Date(),
  });
});

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
