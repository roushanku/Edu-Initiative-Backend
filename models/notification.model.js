import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to User model
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    emailStatus: {
      type: String,
      enum: ['Sent', 'Failed'],
      default: null,
    },
    type: {
      type: String,
      enum: ['BOOKING_REQUEST', 'TUTOR_REQUEST', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED', 'REMINDER', 'SYSTEM'],
      required: true,
    },
    relatedEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    relatedEntityType: {
      type: String,
      enum: ['Booking', 'Payment', 'User'],
      required: false,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
); // This will add createdAt and updatedAt automatically

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
