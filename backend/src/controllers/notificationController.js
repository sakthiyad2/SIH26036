// Notification controller placeholder.
const {
  getUserNotifications,
  markNotificationRead
} = require("../services/notificationService");

const getNotifications = async (
  req,
  res,
  next
) => {
  try {
    const notifications =
      await getUserNotifications(
        req.user.user_id
      );

    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

const markRead = async (
  req,
  res,
  next
) => {
  try {
    const notification =
      await markNotificationRead(
        req.params.id
      );

    res.json({
      success: true,
      message:
        "Notification marked as read",
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markRead
};