import express from 'express';
import * as notificationController from '../../../controllers/v1/notificationController/notification.controller.js';
import validate from '../../../middleware/validate.js';
import * as notificationValidator from '../../../validations/notification.validation.js'
const notificationRouter = express.Router();

//create a notification for a user
notificationRouter.post(
    '/',
    validate(notificationValidator.createNotificationValidation),
    notificationController.createNotification
)

//get all notifications for a user
notificationRouter.get(
    '/',
    validate(notificationValidator.getNotificationsValidation),
    notificationController.getNotifications
)

//get unread notifications for a user
notificationRouter.get(
    '/unread',
    validate(notificationValidator.getUnreadNotificationsValidation),
    notificationController.getUnreadNotifications
)

notificationRouter.patch(
    '/:notificationId/read',
    validate(notificationValidator.markNotificationAsReadValidation),
    notificationController.markNotificationAsRead
)

notificationRouter.patch(
    '/:userId/mark-all-as-read',
    validate(notificationValidator.markAllNotificationsAsReadValidation),
    notificationController.markAllNotificationsAsRead
)

export default notificationRouter;