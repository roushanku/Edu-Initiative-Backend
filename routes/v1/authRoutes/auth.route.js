import express from 'express';
import validate from '../../../middleware/validate.js';
import { authValidation } from '../../../validations/auth.validation.js';
import authController from '../../../controllers/v1/authController/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', validate(authValidation.login), authController.loginUser);
authRouter.post('/register', validate(authValidation.register), authController.registerUser);
authRouter.post('/verify-token', validate(authValidation.verifyToken), authController.verifyToken);

export default authRouter;
