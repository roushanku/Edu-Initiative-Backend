import express from 'express';
import { authenticate, authorize } from '../../../middleware/auth.middleware.js';
import * as authController from '../../../controllers/v1/authController/auth.controller.js';
import validate from "../../../middleware/validate.js";
import {authValidation} from "../../../validations/auth.validation.js";
const authRouter = express.Router();

authRouter.post('/login', validate(authValidation.login),  authController.loginUser);
authRouter.get('/protected', authenticate, authorize(['Student']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

export default authRouter;
