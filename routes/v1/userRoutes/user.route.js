import express from 'express';

import validate from '../../../middleware/validate.js';
import { authenticate, authorize } from '../../../middleware/auth.middleware.js';

import * as userValidation from '../../../validations/user.validation.js';
import * as userController from '../../../controllers/v1/userController/user.controller.js';

const userRouter = express.Router();

userRouter.get('/:id', authenticate, authorize(['Student', 'Admin']), validate(userValidation.getUserById), userController.getUserById);
userRouter.get('/', authenticate, authorize(['Admin']), userController.getAllUsers);
userRouter.put('/:id', authenticate, authorize(['Student', 'Admin']), validate(userValidation.getUserById), userController.updateUser);
userRouter.delete('/:id', authenticate, authorize(['Admin']), validate(userValidation.getUserById), userController.deleteUser);
userRouter.patch('/:id/status', authenticate, authorize(['Admin']), validate(userValidation.toggleUserIsActive), userController.toggleUserIsActive); // Activate/deactivate user

userRouter.put('/:id/profilePicture', authenticate, authorize(['Student', 'Admin']), validate(userValidation.updateProfilePicture), userController.updateProfilePicture);

export default userRouter;
