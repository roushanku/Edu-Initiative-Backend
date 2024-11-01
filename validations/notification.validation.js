import Joi from 'joi';
import { objectId } from './custom.validation.js';

export const createNotificationValidation = {
    body: Joi.object().keys({
        userId: Joi.string()
            .custom(objectId)
            .required(),

        userType: Joi.string()
            .valid('STUDENT', 'TUTOR', 'ADMIN')
            .required(),

        title: Joi.string()
            .required()
            .trim()
            .min(3)
            .max(100),
        

        message: Joi.string()
            .required()
            .trim()
            .min(5)
            .max(500),

        type: Joi.string()
            .valid(
                'BOOKING_REQUEST',
                'BOOKING_CONFIRMED',
                'BOOKING_CANCELLED',
                'PAYMENT_RECEIVED',
                'PAYMENT_CONFIRMED',
                'REMINDER',
                'SYSTEM'
            )
            .required(),

        relatedEntityId: Joi.string()
            .custom(objectId)
            .allow(null),

        relatedEntityType: Joi.string()
            .valid('BOOKING', 'PAYMENT', 'USER')
            .allow(null)
            .when('relatedEntityId', {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.optional()
            }),

        readAt: Joi.date()
            .allow(null)
            .default(null),
    })
};

// Validation for updating notification status
export const markNotificationAsReadValidation = {
    params: Joi.object().keys({
        notificationId: Joi.string()
            .custom(objectId)
            .required()
    })
};

export const markAllNotificationsAsReadValidation = {
    params: Joi.object().keys({
        userId: Joi.string()
            .custom(objectId)
            .required()
    })
};

// Validation for getting notifications (query parameters)
export const getNotificationsValidation = {
    query: Joi.object().keys({
        userId: Joi.string()
            .custom(objectId)
            .required(),

        page: Joi.number()
            .integer()
            .min(1)
            .default(1),

        limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(10),

        userType: Joi.string()
            .valid('STUDENT', 'TUTOR', 'ADMIN')
            .optional(),

        type: Joi.string()
            .valid(
                'BOOKING_REQUEST',
                'BOOKING_CONFIRMED',
                'BOOKING_CANCELLED',
                'PAYMENT_RECEIVED',
                'PAYMENT_CONFIRMED',
                'REMINDER',
                'SYSTEM'
            )
            .optional(),
    })
};
