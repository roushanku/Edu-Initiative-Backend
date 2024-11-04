import mongoose from 'mongoose';
import { notificationService } from '../services/index.js';
// Period for a months and status currect status ["ACTIVE", "END", "INACTIVE"] // here inactive means the time before the start date
// Start date for study

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const hireTutorSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Addresses',
      required: true,
    },
    modeOfStudy: {
      type: String,
      required: true,
      enum: ['ONLINE', 'OFFLINE'],
    },
    days: [
      {
        day: {
          type: String,
          enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
          required: true,
        },
        startTime: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return timeRegex.test(v);
            },
            message: 'Start time must be in HH:mm format',
          },
        },
        endTime: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return timeRegex.test(v);
            },
            message: 'End time must be in HH:mm format',
          },
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    timePeriod: {
      // for the period of the study
      type: Number, // Number for months
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED'],
      default: 'PENDING',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rejectionReason: {
      type: String,
      required: function () {
        return this.status === 'REJECTED';
      },
    },
  },
  { timestamps: true, indexes: [{ studentId: 1, status: 1 }, { tutorId: 1, status: 1 }, { subjectId: 1 }, { startDate: 1 }, { status: 1 }] }
);

// Validate end time is after start time
hireTutorSchema.path('days').validate(function (days) {
  return days.every(({ startTime, endTime }) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    return end > start;
  });
}, 'End time must be after start time');

// Validate time period is positive
hireTutorSchema.path('timePeriod').validate(function (value) {
  return value > 0;
}, 'Time period must be positive');

// Add methods for business logic
hireTutorSchema.methods.isActive = function () {
  const now = new Date();
  return this.status === 'ACCEPTED' && this.startDate <= now && (!this.endDate || this.endDate >= now);
};

// Add virtual field for remaining time
hireTutorSchema.virtual('remainingTime').get(function () {
  if (!this.endDate) return null;
  return Math.max(0, this.endDate - new Date());
});

// Middleware for notifications on hireTutorSchema post-save hook
hireTutorSchema.post('save', async function (doc) {
  if (this.isModified('status')) {
    // Notify the student about the updated status
    await notificationService.createNotification({
      userId: doc.studentId,
      title: 'Tutor Request Update',
      message: `Your tutor request status has been updated to ${doc.status}`,
      type: 'TUTOR_REQUEST',
      relatedEntityId: doc._id,
      relatedEntityType: 'Booking',
    });

    // Notify the tutor about a new request
    await notificationService.createNotification({
      userId: doc.tutorId,
      title: 'New Tutor Request',
      message: 'You have a new tutor request from a student',
      type: 'TUTOR_REQUEST',
      relatedEntityId: doc._id,
      relatedEntityType: 'Booking',
    });
  }
});

const HireTutor = mongoose.model('HireTutor', hireTutorSchema);
export default HireTutor;
