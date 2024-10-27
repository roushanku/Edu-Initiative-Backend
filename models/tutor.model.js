import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  education: [
    {
      degree: String,
      institution: String,
      graduationYear: Number,
      documents: [String], // URLs to degree certificates
    },
  ],
  experience: [
    {
      institution: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  subjects: [
    {
      name: String,
      level: [String], // ['elementary', 'middle', 'high', 'college']
      hourlyRate: Number,
    },
  ],
  availability: [
    {
      dayOfWeek: Number, // 0-6 (Sunday-Saturday)
      startTime: String, // "HH:mm" format
      endTime: String,
    },
  ],
  ratings: {
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  bio: String,
  teachingMethodology: {
    type: String,
    enum: ["Online", "Offline"],
    default: "Offline",
    required: true,
  },
  medium: [String],
  verificationStatus: {
    type: String,
    enum: ["Pending", "Verified", "Rejected"],
    default: "Pending",
  },
});

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
