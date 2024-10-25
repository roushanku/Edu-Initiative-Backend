import Joi from "joi";

export const tutorApplication = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(new RegExp(/^\d{10}$/)),
    aadharNumber: Joi.string().required().pattern(new RegExp(/^\d{12}$/)),
    whatsappNumber: Joi.string().required().pattern(new RegExp(/^\d{10}$/)),
    qualifications: Joi.array()
      .items(Joi.string().valid("10th", "12th", "B.Tech", "B.Ed", "M.TECH", "PHD"))
      .min(1)
      .required(),
    experience: Joi.number().integer().min(0).required(),
    subjects: Joi.array()
      .items(
        Joi.object({
          subjectId: Joi.string().required(), // Assuming IDs are string representations of ObjectId
          class: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
    expertise: Joi.array()
      .items(Joi.string().valid("MATH", "SCIENCE", "ENGLISH", "SOCIAL_STUDIES"))
      .min(1)
      .required(),
    timingPreferred: Joi.array()
      .items(
        Joi.object({
          day: Joi.string()
            .valid(
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
            )
            .required(),
          timings: Joi.array()
            .items(
              Joi.object({
                startTime: Joi.string().required(),
                endTime: Joi.string().required(),
              })
            )
            .min(1)
            .required(),
        })
      )
      .min(1)
      .required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.number().required().min(100000).max(999999), // Indian pincode format
    applicationStatus: Joi.string()
      .valid("UNDERREVIEW", "PENDING", "APPROVED", "REJECTED")
      .default("PENDING"),
  }),
};
