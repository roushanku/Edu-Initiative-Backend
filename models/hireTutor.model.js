import mongoose from "mongoose";

// Period for a months and status currect status ["ACTIVE", "END", "INACTIVE"] // here inactive means the time before the start date
// Start date for study

const hireTutorSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    addressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addresses",
      required: true,
    },
    modeOfStudy: {
      type: String,
      required: true,
      enum: ["ONLINE", "OFFLINE"],
    },
    days: [
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
    startDate: {
      // Date of started teaching
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    timePeriod: {
      // Number of months
      type: String,
      required: true,
    },
    status: {
      // Status of currect application
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Middleware to cancel other requests for the same day, time, and subject if one is accepted
hireTutorSchema.pre("save", async function (next) {
  if (this.isModified("status") && this.status === "ACCEPTED") {
    // Cancel other requests for the same student, day, time, and subject
    await this.model("HireTutor").updateMany(
      {
        studentId: this.studentId,
        day: this.day,
        startTime: this.startTime,
        endTime: this.endTime,
        subjectId: this.subjectId, // Match the subject as well
        status: "PENDING", // Only affect pending requests
        _id: { $ne: this._id }, // Exclude the current request
      },
      { status: "CANCELED" }
    );
  }
  next();
});

const HireTutor = mongoose.model("HireTutor", hireTutorSchema);
export default HireTutor;
