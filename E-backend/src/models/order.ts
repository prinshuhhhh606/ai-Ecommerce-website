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

    platformCommission: {
      type: Number,
      default: 0,
    },

    shopkeeperAmount: {
      type: Number,
      default: 0,
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
