"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// CREATE PAYMENT
router.post("/create-payment", (req, res) => {
    const { amount, customer } = req.body;
    res.json({
        success: true,
        paymentId: `PAY_${Date.now()}`,
        amount,
        customer,
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
exports.default = router;
