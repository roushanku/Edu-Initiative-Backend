import Student from "../../../models/student.model.js";

export const checkStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  return student
    ? { status: true, student }
    : { status: false, message: "Student not found" };
};

export const createStudentProfile = async (data) => {
  const student = new Student(data);
  return await student.save();
};

export const getStudentById = async (id) => {
  return await Student.findById(id).populate("userId subjects.name");
};

export const getAllStudents = async () => {
  return await Student.find().populate("userId subjects.name");
};

export const updateStudentProfile = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, { new: true }).populate(
    "userId subjects.name"
  );
};

export const deleteStudentProfile = async (id) => {
  return await Student.findByIdAndDelete(id);
};

export const updateLearningPreferences = async (id, preferences) => {
  const student = await Student.findById(id);
  if (!student) throw new Error("Student not found");

  student.learningPreferences = {
    ...student.learningPreferences,
    ...preferences,
  };
  return await student.save();
};

export const addSubject = async (id, subject) => {
  const student = await Student.findById(id);
  if (!student) throw new Error("Student not found");

  student.subjects.push(subject);
  return await student.save();
};
