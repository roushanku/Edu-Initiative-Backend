import { studentService } from "../../../services/index.js";

export const createStudentProfile = async (req, res) => {
  try {
    const response = await studentService.createStudentProfile(req.body);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.json({
        status: false,
        message: "Student not found",
      });
    }
    res.json({
      status: true,
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json({
      status: true,
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudentProfile(
      req.params.id,
      req.body
    );
    if (!updatedStudent) {
      return res.json({
        status: false,
        message: "Student profile update failed",
      });
    }
    res.json({
      status: true,
      message: "Student profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteStudentProfile = async (req, res) => {
  try {
    const deletedStudent = await studentService.deleteStudentProfile(
      req.params.id
    );
    if (!deletedStudent) {
      return res.json({
        status: false,
        message: "Failed to delete student profile",
      });
    }
    res.json({
      status: true,
      message: "Student profile deleted successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateLearningPreferences = async (req, res) => {
  try {
    const updatedPreferences = await studentService.updateLearningPreferences(
      req.params.id,
      req.body
    );
    res.json({
      status: true,
      message: "Learning preferences updated successfully",
      data: updatedPreferences,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const addSubject = async (req, res) => {
  try {
    const updatedStudent = await studentService.addSubject(
      req.params.id,
      req.body.subject
    );
    res.json({
      status: true,
      message: "Subject added successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
