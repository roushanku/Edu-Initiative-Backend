import Joi from "joi";

export const tutorApplication = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)),
    aadharNumber: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{12}$/)),
    whatsappNumber: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)),
    qualifications: Joi.array()
      .items(
        Joi.string().valid("10th", "12th", "B.Tech", "B.Ed", "M.TECH", "PHD")
      )
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

export const hireTutor = Joi.object({
  studentId: Joi.string().length(24).hex().required().messages({
    "string.base": "Student ID must be a string.",
    "string.hex": "Student ID must be a valid ObjectId.",
    "string.length": "Student ID must be 24 characters long.",
    "any.required": "Student ID is required.",
  }),

  tutorId: Joi.string().length(24).hex().required().messages({
    "string.base": "Tutor ID must be a string.",
    "string.hex": "Tutor ID must be a valid ObjectId.",
    "string.length": "Tutor ID must be 24 characters long.",
    "any.required": "Tutor ID is required.",
  }),

  subjectId: Joi.string().length(24).hex().required().messages({
    "string.base": "Subject ID must be a string.",
    "string.hex": "Subject ID must be a valid ObjectId.",
    "string.length": "Subject ID must be 24 characters long.",
    "any.required": "Subject ID is required.",
  }),

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
    .required()
    .messages({
      "string.base": "Day must be a string.",
      "any.only":
        "Day must be one of the following: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.",
      "any.required": "Day is required.",
    }),

  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:mm format
    .required()
    .messages({
      "string.base": "Start time must be a string.",
      "string.pattern.base": "Start time must be in the format HH:mm.",
      "any.required": "Start time is required.",
    }),

  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:mm format
    .required()
    .messages({
      "string.base": "End time must be a string.",
      "string.pattern.base": "End time must be in the format HH:mm.",
      "any.required": "End time is required.",
    }),

  status: Joi.string()
    .valid("PENDING", "ACCEPTED", "CANCELED")
    .default("PENDING") // Default value if not provided
    .messages({
      "string.base": "Status must be a string.",
      "any.only":
        "Status must be one of the following: PENDING, ACCEPTED, CANCELED.",
    }),
});

export const tutorSchemaValidation = {
  body: Joi.object().keys({
    userId: Joi.string().required(), // Assuming it's an ObjectId in string form
    education: Joi.array()
      .items(
        Joi.object().keys({
          degree: Joi.string().optional(),
          institution: Joi.string().optional(),
          graduationYear: Joi.number()
            .integer()
            .min(1900)
            .max(new Date().getFullYear())
            .optional(),
          documents: Joi.array().items(Joi.string()).optional(), // URLs to degree certificates
        })
      )
      .optional(),
    experience: Joi.array()
      .items(
        Joi.object().keys({
          institution: Joi.string().optional(),
          position: Joi.string().optional(),
          startDate: Joi.date().optional(),
          endDate: Joi.date().greater(Joi.ref("startDate")).optional(),
          description: Joi.string().optional(),
        })
      )
      .optional(),
    subjects: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          level: Joi.array()
            .items(
              Joi.string().valid("elementary", "middle", "high", "college")
            )
            .optional(),
          hourlyRate: Joi.number().positive().optional(),
        })
      )
      .optional(),
    availability: Joi.array()
      .items(
        Joi.object().keys({
          dayOfWeek: Joi.number().integer().min(0).max(6).required(),
          startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required(),
          endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required(),
        })
      )
      .optional(),
    ratings: Joi.object()
      .keys({
        averageRating: Joi.number().min(0).max(5).optional(),
        totalRatings: Joi.number().integer().min(0).optional(),
      })
      .optional(),
    bio: Joi.string().optional(),
    teachingMethodology: Joi.string().valid("Online", "Offline").required(),
    medium: Joi.array().items(Joi.string()).optional(),
    verificationStatus: Joi.string()
      .valid("Pending", "Verified", "Rejected")
      .optional()
      .default("Pending"),
  }),
};
