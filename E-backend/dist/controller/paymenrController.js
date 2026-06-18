"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
const paymentServices_1 = require("../services/paymentServices");
const paymentService = new paymentServices_1.PaymentService();
const makePayment = (req, res) => {
    const result = paymentService.createPayment(req.body);
    res.status(200).json(result);
};
exports.makePayment = makePayment;
