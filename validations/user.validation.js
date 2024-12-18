import Joi from 'joi';

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
