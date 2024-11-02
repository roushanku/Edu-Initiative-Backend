import * as notificationService from '../../../services/v1/notificationServices/notification.service.js';
export const createNotification = async (req, res) => {
    const response = await notificationService.createNotification(req.body);
    res.json(response);
}

export const getNotifications = async (req, res) => {
    const response = await notificationService.getNotifications(req.query);
    res.json(response);
}

export const getUnreadNotifications = async (req, res) => {
    const response = await notificationService.getUnreadNotifications(req.query);
    res.json(response);
}

export const markNotificationAsRead = async (req, res) => {
    const response = await notificationService.markNotificationAsRead(req.params.notificationId);
    res.json(response);
}

export const markAllNotificationsAsRead = async (req, res) => {
    const response = await notificationService.markAllNotificationsAsRead(req.params.userId);
    res.json(response);
}

export const sendBookingRequestNotification = async (req, res) => {
    const response = await notificationService.sendBookingRequestNotification(req.body);
    res.json(response);
}