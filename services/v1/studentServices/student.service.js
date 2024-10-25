import Student from "../../../models/student.model.js";

export const checkStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  return student
    ? { status: true, student }
    : { status: false, message: "Student not found" };
};
