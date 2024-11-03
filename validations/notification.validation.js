import Joi from 'joi';
import { objectId } from './custom.validation.js';

export const createNotification = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(), // for the user who will receive the notification
    title: Joi.string().required().trim().min(3).max(100),
    message: Joi.string().required().trim().min(5).max(500),
    type: Joi.string().valid('BOOKING_REQUEST', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED', 'REMINDER', 'SYSTEM').required(),
    relatedEntityId: Joi.string().custom(objectId).allow(null),
    relatedEntityType: Joi.string().valid('Booking', 'Payment', 'User').allow(null).when('relatedEntityId', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    readAt: Joi.date().allow(null).default(null),
  }),
};

export const getUserNotifications = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

export const markNotificationAsRead = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const deleteNotification = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const getUnreadCount = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

export const getNotificationsByType = {
  params: Joi.object().keys({
    type: Joi.string().valid('BOOKING_REQUEST', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED', 'REMINDER', 'SYSTEM').required(),
  }),
};
