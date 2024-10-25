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
  }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
