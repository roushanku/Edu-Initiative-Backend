import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  verified_by_admin: {
    type: Boolean,
    default: false
  },
  verification_date: {
    type: Date
  },
  comments: {
    type: String
  }
}, { timestamps: true });

const Verification = mongoose.model("Verification", verificationSchema);
export default Verification;
