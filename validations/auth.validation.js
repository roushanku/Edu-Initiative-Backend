import Joi from 'joi';

export const authValidation = {
  register: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string()
        .optional()
        .pattern(/^\d{10}$/), // Assuming phoneNumber should be a 10-digit number
      profilePicture: Joi.string().optional(),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  refreshToken: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },
  logout: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },
  verifyToken: {
    body: Joi.object().keys({
      token: Joi.string().required(),
    }),
  },
};

export const registerUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string()
      .optional()
      .pattern(/^\d{10}$/), // Assuming phoneNumber should be a 10-digit number
    profilePicture: Joi.string().optional(),
  }),
};
