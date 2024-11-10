import Joi from 'joi';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Common schema parts that are reused
const commonSchemas = {
  objectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  time: Joi.string().pattern(timeRegex).required(),
  scheduleTime: Joi.object({
    startTime: Joi.string().pattern(timeRegex).required(),
    endTime: Joi.string().pattern(timeRegex).required(),
  }),
  scheduleDay: Joi.object({
    day: Joi.string().valid('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY').required(),
    time: Joi.array()
      .items(
        Joi.object({
          startTime: Joi.string().pattern(timeRegex).required(),
          endTime: Joi.string().pattern(timeRegex).required(),
        })
      )
      .min(1)
      .required(),
  }),
};

export const createSession = {
  body: Joi.object({
    hireRequestId: commonSchemas.objectId.required(),
    studentType: Joi.string().valid('REGISTERED', 'NON-REGISTERED').required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    schedule: Joi.array().items(commonSchemas.scheduleDay).min(1).required(),
    status: Joi.string().valid('PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'TRIAL', 'APPROVED', 'PAYMENT_PENDING').default('PENDING'),
    pricing: Joi.object({
      hourlyRate: Joi.number().positive().required(),
    }).required(),
  }),
};

// List sessions validation
export const listSessions = {
  query: Joi.object({
    userId: commonSchemas.objectId,
    role: Joi.string().valid('tutor', 'student'),
    status: Joi.string().valid('PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'TRIAL', 'APPROVED', 'PAYMENT_PENDING'),
    startDate: Joi.date().iso(),
    endDate: Joi.date()
      .iso()
      .when('startDate', {
        is: Joi.date().required(),
        then: Joi.date().greater(Joi.ref('startDate')),
      }),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

// Get session by ID validation
export const getSessionById = {
  params: Joi.object({
    sessionId: commonSchemas.objectId.required(),
  }),
};

// Update session status validation
export const updateSessionStatus = {
  params: Joi.object({
    sessionId: commonSchemas.objectId.required(),
  }),
  body: Joi.object({
    status: Joi.string().valid('PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'TRIAL', 'APPROVED', 'PAYMENT_PENDING').required(),
    reason: Joi.string().when('status', {
      is: 'CANCELLED',
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  }),
};

// Request session extension validation
export const requestExtension = {
  params: Joi.object({
    sessionId: commonSchemas.objectId.required(),
  }),
  body: Joi.object({
    reason: Joi.string().required(),
    extensionDuration: Joi.number().integer().positive().required(),
  }),
};

export const getTutorSessionAnalytics = {
  params: Joi.object({
    tutorId: commonSchemas.objectId.required(),
  }),
  query: Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
  }),
};

export const getStudentSessionAnalytics = {
  params: Joi.object({
    studentId: commonSchemas.objectId.required(),
  }),
  query: Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
  }),
};

// Update extension status validation
export const updateExtensionStatus = {
  params: Joi.object({
    sessionId: commonSchemas.objectId.required(),
    requestId: commonSchemas.objectId.required(),
  }),
  body: Joi.object({
    status: Joi.string().valid('PENDING_TUTOR_APPROVAL', 'PAYMENT_PENDING', 'PENDING_ADMIN_APPROVAL', 'APPROVED', 'REJECTED').required(),
    reason: Joi.string().when('status', {
      is: 'REJECTED',
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  }),
};
