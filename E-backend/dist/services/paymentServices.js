"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const paymentModel_1 = require("../models/paymentModel");
class PaymentService {
    createPayment(data) {
        return {
            success: true,
            paymentId: "PAY_" + Date.now(),
            status: paymentModel_1.PaymentStatus.SUCCESS,
            amount: data.amount,
            transactionDate: new Date(),
            message: "Payment Successful",
        };
    }
}
exports.PaymentService = PaymentService;
