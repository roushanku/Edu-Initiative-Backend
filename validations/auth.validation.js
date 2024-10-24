import { password } from "./custom.validation.js"; // Ensure this function is defined
import Joi from "joi";

export const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("Student", "Tutor"),
  }),
};
