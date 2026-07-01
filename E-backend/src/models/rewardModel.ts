import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      default: 50,
    },

    type: {
      type: String,
      default: "Referral Reward",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Reward", rewardSchema);
