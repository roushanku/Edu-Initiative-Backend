import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema({
  sessionId: {
    type: ObjectId,
    ref: 'Session',
    required: true
  },
  transferFrom: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  transferTo: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: {
      type: String,
      enum: ['UPI', 'NEFT', 'CHEQUE'],
      required: true
    },
    provider: {
      type: String,
      required: true
    }
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  description: String,
  refundReason: String,
  fees: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
paymentSchema.index({ sessionId: 1, status: 1 });
paymentSchema.index({ transferFrom: 1, createdAt: -1 });
paymentSchema.index({ transferTo: 1, createdAt: -1 });
paymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });

const Payment = mongoose.model("Payments", paymentSchema);
export default Payment;