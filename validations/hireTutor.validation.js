import Joi from 'joi';

export const createTutorRequest = {
  body: Joi.object().keys({
    studentId: Joi.string().required(),
    tutorId: Joi.string().required(),
    addressId: Joi.string().required(),
    subjectId: Joi.string().required(),
    modeOfStudy: Joi.string().valid('ONLINE', 'OFFLINE').required(),
    days: Joi.array()
      .items(
        Joi.object().keys({
          day: Joi.string().valid('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY').required(),
          startTime: Joi.string().required(),
          endTime: Joi.string().required(),
        })
      )
      .required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    timePeriod: Joi.number().required(),
    price: Joi.number().required(),
  }),
};

export const getTutorRequests = {
  query: Joi.object().keys({
    modeOfStudy: Joi.string().valid('ONLINE', 'OFFLINE'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getTutorRequestById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const updateTutorRequest = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    studentId: Joi.string(),
    tutorId: Joi.string(),
    addressId: Joi.string(),
    subjectId: Joi.string(),
    modeOfStudy: Joi.string().valid('ONLINE', 'OFFLINE'),
    days: Joi.array().items(
      Joi.object().keys({
        day: Joi.string().valid('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
        startTime: Joi.string(),
        endTime: Joi.string(),
      })
    ),
    startDate: Joi.date(),
    endDate: Joi.date(),
    timePeriod: Joi.number(),
    price: Joi.number(),
  }),
};

export const deleteTutorRequest = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const getTutorRequestsByStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
  }),
};

export const getTutorRequestsByTutor = {
  params: Joi.object().keys({
    tutorId: Joi.string().required(),
  }),
};

export const respondToTutorRequest = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('ACCEPTED', 'REJECTED', 'CANCELED').required(),
  }),
};
