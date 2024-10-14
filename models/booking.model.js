import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "rejected", "trial", "completed"],
    default: "requested"
  },
  trial_end_date: {
    type: Date
  },
  fees_agreed: {
    type: Number
  },
  rejection_reason: {
    type: String
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
