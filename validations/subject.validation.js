import { password } from "./custom.validation.js"; // Ensure this function is defined
import Joi from "joi";

export const createSubject = {
  body: Joi.object().keys({
    subjectName: Joi.string().required(),
    subjectCode: Joi.string().required(),
  }),
};
