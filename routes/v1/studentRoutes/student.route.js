import express from "express";
import * as studentController from "../../../controllers/v1/studentController/student.controller.js";
import validate from "../../../middleware/validate.js";
import * as studentValidation from "../../../validations/student.validation.js";
const studentRouter = express.Router();

// Student management routes
studentRouter.post( "/", validate(studentValidation.createStudent), studentController.createStudentProfile );
studentRouter.get("/:id", validate(studentValidation.getStudentById),  studentController.getStudentById);
studentRouter.get("/", studentController.getAllStudents);
studentRouter.put("/:id",validate(studentValidation.updateStudentProfile), studentController.updateStudentProfile);
studentRouter.delete("/:id", validate(studentValidation.deleteStudentProfile), studentController.deleteStudentProfile);

// Specific actions
studentRouter.patch("/:id/preferences", validate(studentValidation.updateLearningPreferences), studentController.updateLearningPreferences );
studentRouter.patch("/:id/subjects", validate(studentValidation.addSubject), studentController.addSubject);

export default studentRouter;
