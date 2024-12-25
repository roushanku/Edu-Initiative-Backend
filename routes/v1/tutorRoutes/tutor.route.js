import express from 'express';
import validate from '../../../middleware/validate.js'; // Make sure this path is correct
import * as tutorValidator from '../../../validations/tutor.validation.js';
import * as tutorController from '../../../controllers/v1/tutorController/tutor.controller.js';

const tutorRouter = express.Router();

tutorRouter.post('/application', authenticate, authorize(['User']), validate(tutorValidator.tutorApplication), tutorController.createTutorApplication);
tutorRouter.post('/hire', validate(tutorValidator.hireTutor), tutorController.hireTutor);

// Tutor management routes
tutorRouter.post('/', validate(tutorValidator.createTutorProfile), tutorController.createTutorProfile);
tutorRouter.get('/:id', validate(tutorValidator.getTutorById), tutorController.getTutorById);
tutorRouter.get('/', tutorController.getAllTutorsQuery);
tutorRouter.put('/:id', tutorController.updateTutorProfile);
tutorRouter.delete('/:id', validate(tutorValidator.deleteTutorProfile), tutorController.deleteTutorProfile);

// Specific actions
tutorRouter.patch('/:id/subjects', validate(tutorValidator.addSubject), tutorController.addSubject);
tutorRouter.post('/:id/availability', validate(tutorValidator.addAvailability), tutorController.addAvailability);
tutorRouter.patch('/:id/isActive', validate(tutorValidator.updateIsActive), tutorController.updateIsActive);

export default tutorRouter;
