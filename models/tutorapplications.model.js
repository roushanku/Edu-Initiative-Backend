import mongoose from 'mongoose';

const tutorApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    aadharNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    qualifications: {
      type: [String],
      enum: ['10th', '12th', 'B.Tech', 'B.Ed', 'M.TECH', 'PHD'],
      required: true,
    },
    experience: { type: Number, required: true },
    subjects: [
      {
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
        class: { type: String, required: true },
      },
    ],
    expertise: {
      type: [String],
      enum: ['MATH', 'SCIENCE', 'ENGLISH', 'SOCIAL_STUDIES'],
      required: true,
    },
    timingPreferred: [
      {
        day: {
          type: String,
          enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
          required: true,
        },
        timings: [
          {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
          },
        ],
      },
    ],
    applicationStatus: {
      type: String,
      enum: ['UNDERREVIEW', 'PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }, // Reference if address exists in User schema
    documents: [{ type: String }], // Array of document URLs or IDs
  },
  { timestamps: true }
);

const TutorApplications = mongoose.model('TutorApplications', tutorApplicationSchema);

export default TutorApplications;
