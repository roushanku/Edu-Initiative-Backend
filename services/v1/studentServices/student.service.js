import Student from '../../../models/student.model.js';
import { userService, subjectService } from '../../index.js';

export const checkStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  return student ? { status: true, student } : { status: false, message: 'Student not found' };
};

export const createStudentProfile = async (data) => {
  const userId = data.userId;
  const user = await userService.getUserById(userId);
  if (!user) {
    return { status: false, message: 'User not found' };
  }
  if (user.role !== 'User') {
    return { status: false, message: 'User cannot become a student' };
  }

  const subjectCodes = data.subjects;
  const results = await Promise.all(
    subjectCodes.map(async (s) => {
      const subject = await subjectService.getSubjectByCode(s.subjectCode);
      if (!subject.status) {
        return subject; // This returns an object to be part of the results array
      }
      return null; // Return `null` or another indicator if the subject was found successfully
    })
  );

  // Filter out nulls if needed to only get failed cases
  const failedSubjects = results.filter((result) => result !== null);

  if (failedSubjects.length > 0) {
    return { status: false, message: 'One or more subjects not found' };
  }

  await userService.updateUser(userId, { role: 'Student' });
  const studentData = new Student(data);
  const student = await studentData.save();
  return { status: true, message: 'Student profile created successfully', data: student };
};

export const getStudentById = async (id) => {
  return await Student.findById(id);
};

export const getAllStudents = async () => {
  return await Student.find();
};

export const updateStudentProfile = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudentProfile = async (id) => {
  return await Student.findByIdAndDelete(id);
};

export const updateLearningPreferences = async (id, preferences) => {
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');

  student.learningPreferences = {
    ...student.learningPreferences,
    ...preferences,
  };
  return await student.save();
};

export const addSubject = async (id, subject) => {
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');

  student.subjects.push(subject);
  return await student.save();
};
