import express from "express";
import validate from "../../../middleware/validate.js"; // Make sure this path is correct
import * as tutorValidator from "../../../validations/tutor.validation.js";
import * as tutorController from "../../../controllers/v1/tutorController/tutor.controller.js";

const tutorRouter = express.Router();

tutorRouter.get("/", tutorController.getTutors);

tutorRouter.post(
  "/application",
  validate(tutorValidator.tutorApplication),
  tutorController.createTutorApplication
);

tutorRouter.post(
  "/hire",
  validate(tutorValidator.hireTutor),
  tutorController.hireTutor
);

// Tutor management routes
tutorRouter.post(
  "/",
  validate(tutorValidator.tutorSchemaValidation),
  tutorController.createTutorProfile
);
tutorRouter.get("/:id", tutorController.getTutorById);
tutorRouter.get("/", tutorController.getAllTutors);
tutorRouter.put("/:id", tutorController.updateTutorProfile);
tutorRouter.delete("/:id", tutorController.deleteTutorProfile);

// Specific actions
tutorRouter.patch("/:id/subjects", tutorController.addSubject);
tutorRouter.patch("/:id/availability", tutorController.updateAvailability);
tutorRouter.patch(
  "/:id/verification",
  tutorController.updateVerificationStatus
);

export default tutorRouter;
