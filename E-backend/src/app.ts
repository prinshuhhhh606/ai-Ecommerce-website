import express, { Application } from "express";

import cors from "cors";
import Order from "./models/order";
import productRoutes from "./routes/productRoutes";

import authRoutes from './routes/authRoutes'
import paymentRoutes from "./routes/paymentRoutes";
import orderRoutes from './routes/orderRoutes'
import aiRoutes from "./routes/aiRoutes";
import walletRoutes from './routes/walletRoutes'
import couponRoutes from "./routes/coupanRoutes";
import mongoose from "mongoose";
import cartRoutes from './routes/cartRoutes'
import notificationRoutes from "./routes/notificationsRoutes";

import rewardRoutes from "./routes/rewardRoutes";


const app: Application = express();


console.log("Mongo State:", mongoose.connection.readyState);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRoutes)
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
// CREATE ORDER (DB)
app.use("/api/notifications", notificationRoutes);
console.log("ORDER ROUTES REGISTERED");
app.use("/api/rewards", rewardRoutes);


export default app;
