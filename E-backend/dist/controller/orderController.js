"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.default = router;
