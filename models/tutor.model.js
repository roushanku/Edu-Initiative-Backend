import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
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
        fee: {
          type: Number,
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
    daysAvailable: {
      type: [String],
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
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

tutorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const tutor = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!tutor;
};

tutorSchema.statics.isPhoneNumberTaken = async function (phone, excludeUserId) {
  const tutor = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!tutor;
};

tutorSchema.statics.isAadharNumberTaken = async function (
  aadharNumber,
  excludeUserId
) {
  const tutor = await this.findOne({
    aadharNumber,
    _id: { $ne: excludeUserId },
  });
  return !!tutor;
};

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
