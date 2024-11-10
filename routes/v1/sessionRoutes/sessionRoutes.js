import express from 'express';
import { sessionController } from '../../../controllers/v1/index.js';
import validate from '../../../middleware/validate.js';
import * as sessionValidation from '../../../validations/session.validation.js';
const sessionRouter = express.Router();

// Base session routes
sessionRouter.post('/create', validate(sessionValidation.createSession), sessionController.createSession);
sessionRouter.get('/list', validate(sessionValidation.listSessions), sessionController.listSessions);
sessionRouter.get('/:sessionId', validate(sessionValidation.getSessionById), sessionController.getSessionById);
sessionRouter.patch('/:sessionId/status', validate(sessionValidation.updateSessionStatus), sessionController.updateSessionStatus);

// Extension request routes
sessionRouter.post('/:sessionId/extension', validate(sessionValidation.requestExtension), sessionController.requestExtension);
sessionRouter.patch('/:sessionId/extension/:requestId', validate(sessionValidation.updateExtensionStatus), sessionController.updateExtensionStatus);

// Analytics and reporting
// sessionRouter.get('/analytics/tutor/:tutorId', validate(sessionValidation.getTutorSessionAnalytics), sessionController.getTutorSessionAnalytics);
// sessionRouter.get('/analytics/student/:studentId', validate(sessionValidation.getStudentSessionAnalytics), sessionController.getStudentSessionAnalytics);

export default sessionRouter;
