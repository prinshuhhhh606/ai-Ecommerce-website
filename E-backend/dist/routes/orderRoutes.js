"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.default = router;
