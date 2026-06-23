import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Order from "./models/order";
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes'
import paymentRoutes from "./routes/paymentRoutes";
import orderRoutes from './routes/orderRoutes'

dotenv.config();
const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRoutes)
app.use("/api/payment", paymentRoutes);
// CREATE ORDER (DB)

console.log("ORDER ROUTES REGISTERED");



export default app;
