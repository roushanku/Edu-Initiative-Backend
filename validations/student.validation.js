import Joi from "joi";

export const studentSchemaValidation = {
  body: Joi.object().keys({
    userId: Joi.string().required(), // Assuming it's an ObjectId in string form
    gradeLevel: Joi.string().optional(),
    school: Joi.string().optional(),
    subjects: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(), // Assuming subject name is required
        })
      )
      .optional(),
    learningPreferences: Joi.object()
      .keys({
        preferredLanguage: Joi.string().optional(),
        learningMode: Joi.array()
          .items(Joi.string().valid("ONLINE", "OFFLINE"))
          .optional(),
        groupPreference: Joi.string()
          .valid("individual", "group", "both")
          .optional(),
      })
      .optional(),
    parentGuardianInfo: Joi.object()
      .keys({
        name: Joi.string().optional(),
        relation: Joi.string().optional(),
        phoneNumber: Joi.string()
          .optional()
          .pattern(/^\d{10}$/), // Assuming phoneNumber should be a 10-digit number
      })
      .optional(),
  }),
};
