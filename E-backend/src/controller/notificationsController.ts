import Notification from "../models/notificationsModel";


export const getNotifications = async (req: any, res: any) => {
  try {
    // Check logged-in user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};export const markAsRead = async (req: any, res: any) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
    });

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const markAllRead = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const result = await Notification.updateMany(
      {
        user: userId,
        read: false,
      },
      {
        $set: {
          read: true,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};