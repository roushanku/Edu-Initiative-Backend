import express from 'express';
import * as notificationController from '../../../controllers/v1/notificationController/notification.controller.js';
import * as notificationValidator from '../../../validations/notification.validation.js';
import validate from '../../../middleware/validate.js';
import { authenticate } from '../../../middleware/auth.middleware.js';
import { sendEmail } from '../../../services/v1/emailServices/email.service.js';

const router = express.Router();

// router.use(authenticate);
router.post('/', validate(notificationValidator.createNotification), notificationController.createNotification);
router.get('/user/:userId', validate(notificationValidator.getUserNotifications), notificationController.getUserNotifications);
router.patch('/:id/read', validate(notificationValidator.markNotificationAsRead), notificationController.markNotificationAsRead);
router.delete('/:id', validate(notificationValidator.deleteNotification), notificationController.deleteNotification);
router.get('/user/:userId/unread-count', validate(notificationValidator.getUnreadCount), notificationController.getUnreadCount);
router.get('/type/:type', validate(notificationValidator.getNotificationsByType), notificationController.getNotificationsByType);
router.post('/send-email', sendEmail);
export default router;
