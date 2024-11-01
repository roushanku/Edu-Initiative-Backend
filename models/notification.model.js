import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Reference to User model
  },
  userType: {
    type: String,
    enum: ['STUDENT', 'TUTOR', 'ADMIN'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'BOOKING_REQUEST',
      'BOOKING_CONFIRMED',
      'BOOKING_CANCELLED',
      'PAYMENT_RECEIVED',
      'PAYMENT_CONFIRMED',
      'REMINDER',
      'SYSTEM'
    ],
    required: true
  },
  relatedEntityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  relatedEntityType: {
    type: String,
    enum: ['BOOKING', 'PAYMENT', 'USER'],
    required: false
  },
  readAt: {
    type: Date,
    default: null
  }
}, { timestamps: true }); // This will add createdAt and updatedAt automatically

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;