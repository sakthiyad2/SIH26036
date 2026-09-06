// Notification controller placeholder.
const {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
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

const markAllRead = async (req, res, next) => {
  try {
    await markAllNotificationsRead(req.user.user_id);
    res.json({
      success: true,
      message: "Notifications marked as read"
    });
  } catch (error) {
    next(error);
  }
};

const removeNotification = async (req, res, next) => {
  try {
    await deleteNotification(req.params.id);
    res.json({
      success: true,
      message: "Notification deleted"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markRead,
  markAllRead,
  removeNotification
};