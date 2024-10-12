import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "approved"],
    default: "pending"
  },
  payment_date: {
    type: Date
  },
  payment_due_date: {
    type: Date
  },
  amount: {
    type: Number,
    required: true
  },
  approved_by_admin: {
    type: Boolean,
    default: false
  },
  admin_approval_date: {
    type: Date
  }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
