import Joi from 'joi';

export const addAddress = {
  body: Joi.object().keys({
    type: Joi.string().valid('Home', 'Work', 'Other'),
    label: Joi.string(),
    town: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().default('India'),
    zipCode: Joi.string().required(),
    location: Joi.object().keys({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array().items(Joi.number()),
    }),
    additionalInfo: Joi.string(),
  }),
};

export const getAddressById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const updateAddress = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    type: Joi.string().valid('Home', 'Work', 'Other'),
    label: Joi.string(),
    town: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
    location: Joi.object().keys({
      type: Joi.string().valid('Point'),
      coordinates: Joi.array().items(Joi.number()),
    }),
    additionalInfo: Joi.string(),
    isDefault: Joi.boolean(),
  }),
};

export const deleteAddress = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const setDefaultAddress = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
