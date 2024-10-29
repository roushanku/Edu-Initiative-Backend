import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    hireRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HireTutor",
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    studentType: {
      type: String,
      enum: ["REGISTERED", "NON-REGISTERED"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    schedule: [
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

        time: [
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
    status: {
      type: String,
      enum: ["PENDING", "ONGOING", "COMPLETED", "CANCELLED"],
      required: true,
    },
    pricing: {
      hourlyRate: {
        type: Number,
        required: true,
      },
    },
    location: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses",
        required: true,
      },
    },
  }
  ,{ timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
