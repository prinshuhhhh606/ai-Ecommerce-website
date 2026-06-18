"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const orders = [];
app.post("/orders", (req, res) => {
    const order = {
        _id: `ORD_${Date.now()}`,
        ...req.body,
        createdAt: new Date(),
    };
    orders.push(order);
    console.log("ORDER SAVED =>", order);
    res.status(201).json(order);
});
app.get("/orders", (req, res) => {
    console.log("ALL ORDERS =>", orders);
    res.json(orders);
});
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Fake Payment API Running",
    });
});
// CREATE PAYMENT
app.post("/create-payment", (req, res) => {
    const { amount, customer } = req.body;
    res.status(201).json({
        success: true,
        paymentId: `PAY_${Date.now()}`,
        status: "SUCCESS",
        amount,
        customer,
        transactionDate: new Date(),
        message: "Payment Successful",
    });
});
// GET PAYMENT BY ID
app.get("/payment/:id", (req, res) => {
    res.status(200).json({
        success: true,
        paymentId: req.params.id,
        status: "SUCCESS",
        message: "Payment Found",
    });
});
exports.default = app;
