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
      subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }, // Reference to Subject model
      level: [String], // ['elementary', 'middle', 'high', 'college']
      hourlyRate: Number,
    },
  ],
  availability: [
    {
      dayOfWeek: {
        type: String,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true,
      },
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
  isActive: { type: Boolean, default: true },
});

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
