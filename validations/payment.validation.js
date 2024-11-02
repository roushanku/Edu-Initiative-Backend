import Joi from "joi";

export const createPayment = {
  body: Joi.object().keys({
    sessionId: Joi.string().required(),
    transferTo: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    paymentMethod: Joi.object()
      .keys({
        type: Joi.string().required(),
        provider: Joi.string().required(),
      })
      .required(),
    transactionId: Joi.string().optional().allow(null),
    description: Joi.string().optional().allow(""),
    fees: Joi.number().default(0),
  }),
};

export const paymentId = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const refundPayment = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    refundReason: Joi.string().required(),
  }),
};

export const userId = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

export const verifyPayment = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const sessionId = {
  params: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
};
