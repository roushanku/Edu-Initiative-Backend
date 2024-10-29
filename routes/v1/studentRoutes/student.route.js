import express from "express";
import * as studentController from "../../../controllers/v1/studentController/student.controller.js";
import validate from "../../../middleware/validate.js";
import * as studentValidation from "../../../validations/student.validation.js";
const studentRouter = express.Router();

// Student management routes
studentRouter.post(
  "/",
  validate(studentValidation.studentSchemaValidation),
  studentController.createStudentProfile
);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.get("/", studentController.getAllStudents);
studentRouter.put("/:id", studentController.updateStudentProfile);
studentRouter.delete("/:id", studentController.deleteStudentProfile);

// Specific actions
studentRouter.patch(
  "/:id/preferences",
  studentController.updateLearningPreferences
);
studentRouter.patch("/:id/subjects", studentController.addSubject);

export default studentRouter;
