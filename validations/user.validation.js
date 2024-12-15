import Joi from 'joi';

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

export const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const toggleUserIsActive = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const updateProfilePicture = {
  body: Joi.object().keys({
    profilePicture: Joi.string().required(),
  }),
};
