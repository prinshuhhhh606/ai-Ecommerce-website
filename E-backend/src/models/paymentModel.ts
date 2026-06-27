import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },

    // Before discount
    originalAmount: {
      type: Number,
      default: 0,
    },

    // After discount
    amount: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "NET_BANKING", "COD"],
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
      default: "SUCCESS",
    },

    developerAmount: {
      type: Number,
      default: 0,
    },

    shopkeeperAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
