import Notification from '../../../models/notification.model.js';

export const createNotification = async (notificationData) => {
  const notification = await Notification.create(notificationData);
  return { status: true, message: 'Notification created successfully', data: notification };
};

export const getUserNotifications = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const notification = await Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
  return { status: true, message: 'Notifications fetched successfully', data: notification };
};

export const markAsReadByNotificationId = async (notificationId) => {
  const notification = await Notification.findByIdAndUpdate(notificationId, { readAt: new Date() }, { new: true });
  if (!notification) {
    return { status: false, message: 'Notification not found' };
  }
  return { status: true, message: 'Notification marked as read', data: notification };
};

export const markAsReadByUserId = async (userId) => {
  const notification = await Notification.findOneAndUpdate({ userId }, { readAt: new Date() }, { new: true });

  if (!notification) {
    return { status: false, message: 'Notification not found' };
  }
  return { status: true, message: 'Notification marked as read', data: notification };
};

export const deleteNotification = async (notificationId) => {
  const notification = await Notification.findByIdAndDelete(notificationId);
  if (!notification) {
    return { status: false, message: 'Notification not found' };
  }
  return { status: true, message: 'Notification deleted successfully' };
};

export const getUnreadCount = async (userId) => {
  const notification = await Notification.countDocuments({
    userId,
    readAt: null,
  });
  return { status: true, message: 'Unread count fetched successfully', data: notification };
};

export const getNotificationsByType = async (type) => {
  const notification = await Notification.find({ type });
  return { status: true, message: 'Notifications fetched successfully', data: notification };
};
