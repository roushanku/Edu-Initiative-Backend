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

export default sessionRouter;