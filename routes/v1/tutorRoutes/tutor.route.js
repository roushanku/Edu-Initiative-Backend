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
export default tutorRouter;
