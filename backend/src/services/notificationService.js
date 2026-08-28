// Notification service placeholder.
const Notification =
  require("../models/Notification");

const createNotification = async (
  userId,
  title,
  message
) => {
  return Notification.create({
    user_id: userId,
    title,
    message
  });
};

const getUserNotifications = async (userId) => {
  return Notification.findByUser(userId);
};

const markNotificationRead = async (id) => {
  return Notification.markAsRead(id);
};

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationRead
};