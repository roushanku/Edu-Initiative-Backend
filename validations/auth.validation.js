import { password } from "./custom.validation.js"; // Ensure this function is defined
import Joi from "joi";

export const registerStudent = {
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

export const registerTutor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)), // validates 10-digit phone number
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    aadharNumber: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{4}-\d{4}-\d{4}$/)), // matches pattern like 1234-5678-9101
    whatsappNumber: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)),
    qualifications: Joi.array()
      .items(
        Joi.string().valid("10th", "12th", "B.Tech", "B.Ed", "M.TECH", "PHD")
      )
      .required(),
    experience: Joi.number().required(),
    subjects: Joi.array()
      .items(
        Joi.object({
          subjectId: Joi.string().required(), // assuming subjectId is a string/ObjectId
          fee: Joi.number().required(),
        })
      )
      .required(),
    expertise: Joi.array()
      .items(Joi.string().valid("MATH", "SCIENCE", "ENGLISH", "SOCIAL_STUDIES"))
      .required(),
    timingPreferred: Joi.array()
      .items(
        Joi.object({
          day: Joi.array()
            .items(
              Joi.string().valid(
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
              )
            )
            .required(),
          timings: Joi.array()
            .items(
              Joi.object({
                startTime: Joi.string().required(),
                endTime: Joi.string().required(),
              })
            )
            .required(),
        })
      )
      .required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    city: Joi.string().required(),
    role: Joi.string().required().valid("Tutor"), // ensuring the role is 'Tutor'
  }),
};

export const login = {
  body: Joi.object().keys({
    idNumber: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
