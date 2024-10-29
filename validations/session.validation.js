import Joi from "joi";

export const createSession = {
  body: Joi.object().keys({
    hireRequestId: Joi.string().required(), // Assuming ObjectId is represented as a string
    tutorId: Joi.string().required(),
    studentId: Joi.string().required(),
    studentType: Joi.string().valid("REGISTERED", "NON-REGISTERED").required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required(),
    schedule: Joi.array()
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
          time: Joi.array()
            .items(
              Joi.object({
                startTime: Joi.string()
                  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .required(),
                endTime: Joi.string()
                  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .required(),
              })
            )
            .required(),
        })
      )
      .required(),
    status: Joi.string()
      .valid("PENDING", "ONGOING", "COMPLETED", "CANCELLED")
      .required(),
    pricing: Joi.object({
      hourlyRate: Joi.number().positive().required(),
    }).required(),
    location: Joi.object({
      addressId: Joi.string().required(), // Assuming ObjectId is represented as a string
    }).required(),
  }),
};
