import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Order from "./models/order";
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes'

dotenv.config();
const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
// CREATE ORDER (DB)


app.post("/api/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    console.log("ORDER SAVED =>", order);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET ORDERS (DB)
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running with MongoDB 🚀",
  });
});

// PAYMENT (same ok)
app.post("/create-payment", (req, res) => {
  const { amount, customer } = req.body;

  res.json({
    success: true,
    paymentId: `PAY_${Date.now()}`,
    status: "SUCCESS",
    amount,
    customer,
    message: "Payment Successful",
  });
});

app.get("/payment/:id", (req, res) => {
  res.json({
    success: true,
    paymentId: req.params.id,
    status: "SUCCESS",
  });
});

export default app;
