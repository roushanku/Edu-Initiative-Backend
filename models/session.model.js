import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    hireRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HireTutor',
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentType: {
      type: String,
      enum: ['REGISTERED', 'NON-REGISTERED'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    schedule: [
      {
        day: {
          type: String,
          enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
          required: true,
        },

        time: [
          {
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ['PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'TRIAL', 'APPROVED', 'PAYMENT_PENDING'],
      //How to identify who has cancelled the session? -
      required: true,
      default: 'PENDING',
    },
    pricing: {
      hourlyRate: {
        type: Number,
        required: true,
      },
    },
    location: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses',
        required: true,
      },
    },
    extensionRequest: [
      {
        status: {
          type: String,
          enum: ['PENDING_TUTOR_APPROVAL', 'PAYMENT_PENDING', 'PENDING_ADMIN_APPROVAL', 'APPROVED', 'REJECTED'],
          //"PAYMENT_PENDING" is added to the enum list -- it will be used to indicate that tutor has accpeted the extension request but payment is pending
          required: true,
        },
        reason: {
          type: String,
        },
        requestedDate: {
          type: Date,
          required: true,
        },
        approvedDate: {
          type: Date,
        },
        extensionDuration: {
          //month
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);
export default Session;
