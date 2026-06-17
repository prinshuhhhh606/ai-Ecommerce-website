import { Router } from "express";

const router = Router();

// Save Order
router.post("/orders", (req, res) => {
  const order = {
    _id: `ORD_${Date.now()}`,
    ...req.body,
    createdAt: new Date(),
  };

  console.log("ORDER RECEIVED =>", order);

  res.status(201).json(order);
});

// Get All Orders
router.get("/orders", (req, res) => {
  res.json([]);
});

export default router;
