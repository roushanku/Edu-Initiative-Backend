import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  hours_per_day: {
    type: Number,
    required: true
  },
  days_per_week: {
    type: Number,
    required: true
  },
  expected_fees: {
    type: Number,
    required: true
  },
  preferred_gender: {
    type: String,
    enum: ["Male", "Female", "No Preference"]
  },
  preferred_exp: {
    type: Boolean,
    default: false
  },
  preferred_timing: {
    type: [String],
    required: true
  },
  aadhaar_no: {
    type: String,
  },
  payment_due_in_days: {
    type: Number,
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
