import { notificationService } from '../../../services/index.js';

export const createNotification = async (req, res) => {
  try {
    const response = await notificationService.createNotification(req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const response = await notificationService.getUserNotifications(req.params.userId, req.query.page, req.query.limit);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const response = await notificationService.markAsReadByUserId(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const response = await notificationService.deleteNotification(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const response = await notificationService.getUnreadCount(req.params.userId);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getNotificationsByType = async (req, res) => {
  try {
    const response = await notificationService.getNotificationsByType(req.params.type);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
