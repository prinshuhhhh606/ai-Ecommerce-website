import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        thumbnail: String,
        category: String,
      },
    ],

    totalAmount: {
      type: Number,
      default: 0,
    },

    // Developer/Admin Commission
    developerAmount: {
      type: Number,
      default: 0,
    },

    // Shopkeeper Share
    shopkeeperAmount: {
      type: Number,
      default: 0,
    },

    // Payment Status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    // Settlement Status
    settlementStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
      ],
      default: "Pending",
    },

    hiddenByUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
