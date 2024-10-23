import { password } from "./custom.validation.js"; // Ensure this function is defined
import Joi from "joi";

export const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};
