import express from "express";
import validate from "../../../middleware/validate.js"; // Make sure this path is correct
import * as subjectValidator from "../../../validations/subject.validation.js";
import * as subjectController from "../../../controllers/v1/subjectController/subject.controller.js";

const subjectRouter = express.Router();

// subjectRouter.post( "/", authMiddleware(["Admin"]), validate(subjectValidator.createSubject), subjectController.createSubject);

subjectRouter.get('/', subjectController.getAllSubjects);
subjectRouter.get('/:id', validate(subjectValidator.getSubjectById), subjectController.getSubjectById);
subjectRouter.post('/', validate(subjectValidator.createSubject), subjectController.createSubject);
subjectRouter.put('/:id', validate(subjectValidator.updateSubject), subjectController.updateSubject);
subjectRouter.delete('/:id', validate(subjectValidator.deleteSubject), subjectController.deleteSubject);

export default subjectRouter;
