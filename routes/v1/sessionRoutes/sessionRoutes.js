import express from 'express';
import * as sessionController from '../../../controllers/v1/sessionController/session.controller.js';
import validate from '../../../middleware/validate.js';
import * as sessionValidator from '../../../validations/session.validation.js'
const sessionRouter = express.Router();

sessionRouter.post(
    '/',
    validate(sessionValidator.createSession),
    sessionController.createSession
)

sessionRouter.get(
    '/:sessionId/extension-eligibility',
    sessionController.checkSessionExtensionEligibility
)

sessionRouter.post(
    '/:sessionId/extend',
    sessionController.extendSession
)

export default sessionRouter;