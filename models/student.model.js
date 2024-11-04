import mongoose from 'mongoose';

// Student Profile Schema
const studentSchema = {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gradeLevel: String,
  school: String,
  subjects: [
    {
      // For recommendation system
      subjectCode: {
        type: String,
        ref: 'Subjects',
      },
    },
  ],
  learningPreferences: {
    preferredLanguage: String,
    learningMode: [String], // ['ONLINE', 'OFFLINE']
    groupPreference: String, // ['individual', 'group', 'both']
  },
  parentGuardianInfo: {
    name: String,
    relation: String,
    phoneNumber: String,
  },
};

/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentSchema);
export default Student;
