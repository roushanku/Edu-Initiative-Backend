import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  qualifications: {
    type: [String],
    enum: ["10th", "12th", "B.Tech", "B.Ed"],
    required: true
  },
  experience: {
    type: Boolean,
    default: false
  },
  expertise: {
    type: [String],
    enum: ["Math", "Science", "English", "Social Studies"],
    required: true
  },
  timing_preferred: {
    type: [String],
    required: true
  },
  days_available: {
    type: [String],
    required: true
  },
  no_of_hours: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "verified", "ongoing"],
    default: "pending"
  },
}, { timestamps: true });

const Tutor = mongoose.model("Teacher", tutorSchema);
export default Tutor;
