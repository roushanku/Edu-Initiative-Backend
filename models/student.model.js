import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"]
  },
  whatsapp: {
    type: String,
    required: true
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
  pincode: {
    type: String,
    required: true
  },
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
    required: false
  },
  payment_due_in_days: {
    type: Number,
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
