import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 🔗 Link to Payment
    paymentId: {
      type: String,
      default: null,
    },

    // 🏷️ Coupon tracking
    couponCode: {
      type: String,
      default: null,
    },

    // 💰 Discount fields (FIXED HERE)
    discount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    coupon: {
      type: String,
      default: null,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },
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

    developerAmount: {
      type: Number,
      default: 0,
    },

    shopkeeperAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

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
