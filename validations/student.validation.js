import Joi from "joi";

export const createStudent = {
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


export const getStudentById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const updateStudentProfile = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    gradeLevel: Joi.string().optional(),
    school: Joi.string().optional(),
    subjects: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
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
          .pattern(/^\d{10}$/),
      })
      .optional(),
  }),
}

export const deleteStudentProfile = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}

export const updateLearningPreferences = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    preferredLanguage: Joi.string().optional(),
    learningMode: Joi.array()
      .items(Joi.string().valid("ONLINE", "OFFLINE"))
      .optional(),
    groupPreference: Joi.string()
      .valid("individual", "group", "both")
      .optional(),
  }),
}

export const addSubject = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}