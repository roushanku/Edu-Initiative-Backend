import Joi from 'joi';

export const tutorApplication = {
  body: Joi.object().keys({
    aadharNumber: Joi.string()
      .required()
      .pattern(/^\d{12}$/),
    whatsappNumber: Joi.string()
      .required()
      .pattern(new RegExp(/^\d{10}$/)),
    qualifications: Joi.array().items(Joi.string().valid('10th', '12th', 'B.Tech', 'B.Ed', 'M.TECH', 'PHD')).min(1).required(),
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
    expertise: Joi.array().items(Joi.string().valid('MATH', 'SCIENCE', 'ENGLISH', 'SOCIAL_STUDIES')).min(1).required(),
    timingPreferred: Joi.array()
      .items(
        Joi.object({
          day: Joi.string().valid('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY').required(),
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
    addressId: Joi.string().required(),
    documents: Joi.array().items(Joi.string()).required(),
  }),
};

export const createTutorProfile = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    education: Joi.array().items(
      Joi.object().keys({
        degree: Joi.string().required(),
        institution: Joi.string().required(),
        graduationYear: Joi.number().required(),
        documents: Joi.array().items(Joi.string()).required(),
      })
    ),
    experience: Joi.array().items(
      Joi.object().keys({
        institution: Joi.string().required(),
        position: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        description: Joi.string().required(),
      })
    ),
    subjects: Joi.array().items(
      Joi.object().keys({
        subjectId: Joi.string().required(),
        level: Joi.array().items(Joi.string()).required(),
        hourlyRate: Joi.number().required(),
      })
    ),
    availability: Joi.array().items(
      Joi.object().keys({
        dayOfWeek: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
      })
    ),
    ratings: Joi.object().keys({
      averageRating: Joi.number().required(),
      totalRatings: Joi.number().required(),
    }),
    bio: Joi.string().required(),
    teachingMethodology: Joi.string().required(),
    medium: Joi.array().items(Joi.string()).required(),
    isActive: Joi.boolean().required().default(true),
  }),
};

export const hireTutor = {
  body: Joi.object().keys({
    studentId: Joi.string().required(),
    tutorId: Joi.string().required(),
    subjectId: Joi.string().required(),
    day: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    status: Joi.string().required(),
  }),
};

export const getTutorById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const deleteTutorProfile = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const addSubject = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    subjectId: Joi.string().required(),
    level: Joi.array().items(Joi.string()).required(),
    hourlyRate: Joi.string().required(),
  }),
};

export const addAvailability = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    dayOfWeek: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  }),
};

export const updateVerificationStatus = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    applicationStatus: Joi.string().valid('UNDERREVIEW', 'PENDING', 'APPROVED', 'REJECTED').required(),
  }),
};

export const updateIsActive = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    isActive: Joi.boolean().required(),
  }),
};
