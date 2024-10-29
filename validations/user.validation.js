const Joi = require("joi");

export const userSchemaValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string()
      .optional()
      .pattern(/^\d{10}$/), // Assuming phoneNumber should be a 10-digit number
    addresses: Joi.array().items(Joi.string()).optional(), // Assuming addresses are string representations of ObjectId
    profilePicture: Joi.string().optional(),
    role: Joi.string().valid("Student", "Tutor", "Admin", "User").required(),
    isActive: Joi.boolean().optional().default(true),
  }),
};
