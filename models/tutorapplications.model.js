import mongoose from "mongoose";

const tutorapplicationsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      enum: ["10th", "12th", "B.Tech", "B.Ed", "M.TECH", "PHD"],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    subjects: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        class: {
          type: String,
          required: true,
        },
      },
    ],
    expertise: {
      type: [String],
      enum: ["MATH", "SCIENCE", "ENGLISH", "SOCIAL_STUDIES"],
      required: true,
    },
    timingPreferred: [
      {
        day: {
          type: String,
          enum: [
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ],
          required: true,
        },
        timings: [
          {
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["UNDERREVIEW", "PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const TutorApplications = mongoose.model(
  "TutorApplications",
  tutorapplicationsSchema
);

export default TutorApplications;
