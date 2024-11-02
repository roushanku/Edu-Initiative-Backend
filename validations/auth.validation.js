import Joi from 'joi';

export const authValidation = {
  register: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      role: Joi.string().valid('user', 'admin')
    })
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  },
  refreshToken: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  },
  logout: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  }
};

