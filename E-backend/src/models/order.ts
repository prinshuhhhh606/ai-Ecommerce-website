import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: String,
  price: Number,
  customer: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
