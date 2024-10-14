import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"]
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  address: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
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

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
