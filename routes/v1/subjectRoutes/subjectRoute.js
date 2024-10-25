import express from "express";
import validate from "../../../middleware/validate.js"; // Make sure this path is correct
import * as subjectValidator from "../../../validations/subject.validation.js";
import * as subjectController from "../../../controllers/v1/subjectController/subject.controller.js";
import authMiddleware from "../../../middleware/auth.middleware.js";
const subjectRouter = express.Router();

subjectRouter.post(
  "/",
  authMiddleware(["Admin"]),
  validate(subjectValidator.createSubject),
  subjectController.createSubject
);
export default subjectRouter;
