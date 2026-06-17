import { Router } from "express";

const router = Router();

router.post("/orders", (req, res) => {
  const order = {
    _id: `ORD_${Date.now()}`,
    ...req.body,
    createdAt: new Date(),
  };

  res.status(201).json(order);
});

router.get("/orders", (req, res) => {
  res.status(200).json([]);
});

export default router;
