import { password } from "./custom.validation.js"; // Ensure this function is defined
import Joi from "joi";

export const studentSchemaValidation = {
  body: Joi.object().keys({
    // User
    userId: Joi.string().required(),

    // Address
    type: Joi.string()
      .valid("Home", "Work", "Other")
      .default("Home")
      .optional(),
    label: Joi.string().optional(),
    town: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().default("India").required(),
    zipCode: Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid("Point").default("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).required(),
    additionalInfo: Joi.string().optional(),
    isDefault: Joi.boolean().default(true).optional(),

    // Student
    gradeLevel: Joi.string().optional(),
    school: Joi.string().optional(),
    subjects: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(), // Assuming name is a string that references the Subjects collection
        })
      )
      .optional(),
    learningPreferences: Joi.object({
      preferredLanguage: Joi.string().optional(),
      learningMode: Joi.array()
        .items(Joi.string().valid("ONLINE", "OFFLINE"))
        .optional(),
      groupPreference: Joi.string()
        .valid("individual", "group", "both")
        .optional(),
    }).optional(),
    parentGuardianInfo: Joi.object({
      name: Joi.string().optional(),
      relation: Joi.string().optional(),
      phoneNumber: Joi.string()
        .optional()
        .pattern(/^\d{10}$/), // Assuming phoneNumber should be a 10-digit number
    }).optional(),
  }),
};

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

export const tutorSchemaValidation = {
  body: Joi.object().keys({
    // User
    userId: Joi.string().required(),
    // Address
    type: Joi.string()
      .valid("Home", "Work", "Other")
      .default("Home")
      .optional(),
    label: Joi.string().optional(),
    town: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().default("India").required(),
    zipCode: Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid("Point").default("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).required(),
    additionalInfo: Joi.string().optional(),
    isDefault: Joi.boolean().default(true).optional(),

    // Tutor
    education: Joi.array()
      .items(
        Joi.object({
          degree: Joi.string().optional(),
          institution: Joi.string().optional(),
          graduationYear: Joi.number().integer().optional(),
          documents: Joi.array().items(Joi.string().uri()).optional(), // Assuming documents are URLs
        })
      )
      .optional(),
    experience: Joi.array()
      .items(
        Joi.object({
          institution: Joi.string().optional(),
          position: Joi.string().optional(),
          startDate: Joi.date().optional(),
          endDate: Joi.date().optional(),
          description: Joi.string().optional(),
        })
      )
      .optional(),
    subjects: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().optional(),
          level: Joi.array()
            .items(
              Joi.string().valid("elementary", "middle", "high", "college")
            )
            .optional(),
          hourlyRate: Joi.number().optional(),
        })
      )
      .optional(),
    availability: Joi.array()
      .items(
        Joi.object({
          dayOfWeek: Joi.number().integer().min(0).max(6).optional(), // 0-6 (Sunday-Saturday)
          startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .optional(), // "HH:mm" format
          endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .optional(), // "HH:mm" format
        })
      )
      .optional(),
    ratings: Joi.object({
      averageRating: Joi.number().default(0),
      totalRatings: Joi.number().default(0),
    }).optional(),
    bio: Joi.string().optional(),
    teachingMethodology: Joi.string()
      .valid("Online", "Offline")
      .required()
      .default("Offline"),
    medium: Joi.array().items(Joi.string()).optional(),
    verificationStatus: Joi.string()
      .valid("Pending", "Verified", "Rejected")
      .default("Pending")
      .optional(),
  }),
};

export const login = {
  body: Joi.object().keys({
    idNumber: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
