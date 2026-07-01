import Reward from "../models/rewardModel";

export const getRewards = async (req: any, res: any) => {
  try {
    const rewards = await Reward.find({
      receiver: req.user.id,
    })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rewards,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
