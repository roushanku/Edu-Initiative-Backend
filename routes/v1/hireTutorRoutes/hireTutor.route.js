import express from 'express';
import { hireTutorController } from '../../../controllers/v1/index.js';
import { authenticate } from '../../../middleware/auth.middleware.js';
import validate from '../../../middleware/validate.js';
import * as hireTutorValidator from '../../../validations/hireTutor.validation.js';

const router = express.Router();

// router.use(authenticate); // Protect all routes

router.post('/', validate(hireTutorValidator.createTutorRequest), hireTutorController.createTutorRequest);
router.get('/', validate(hireTutorValidator.getTutorRequests), hireTutorController.getTutorRequests);
router.get('/:id', validate(hireTutorValidator.getTutorRequestById), hireTutorController.getTutorRequestById);
router.put('/:id', validate(hireTutorValidator.updateTutorRequest), hireTutorController.updateTutorRequest);
router.delete('/:id', validate(hireTutorValidator.deleteTutorRequest), hireTutorController.deleteTutorRequest);
router.get('/student/:studentId', validate(hireTutorValidator.getTutorRequestsByStudent), hireTutorController.getTutorRequestsByStudent);
router.get('/tutor/:tutorId', validate(hireTutorValidator.getTutorRequestsByTutor), hireTutorController.getTutorRequestsByTutor);
router.patch('/:id/respond', validate(hireTutorValidator.respondToTutorRequest), hireTutorController.respondToTutorRequest);

export default router;
