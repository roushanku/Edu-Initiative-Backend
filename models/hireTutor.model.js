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
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    timePeriod: { // for the period of the study
      type: Number, // Number for months
      required: true,
    },
    status: { // for the status of the request
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
    await this.model("HireTutor").updateMany(
      {
        studentId: this.studentId,
        subjectId: this.subjectId,
        status: "PENDING",
        _id: { $ne: this._id },
      },
      { status: "CANCELED" }
    );
  }
  next();
});



const HireTutor = mongoose.model("HireTutor", hireTutorSchema);
export default HireTutor;
