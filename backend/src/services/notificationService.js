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

const markAllNotificationsRead = async (userId) => {
  return Notification.markAllAsRead(userId);
};

const deleteNotification = async (id) => {
  return Notification.delete(id);
};

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
};