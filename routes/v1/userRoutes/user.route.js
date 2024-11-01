import express from "express";
import * as userController from "../../../controllers/v1/userController/user.controller.js";
import validate from "../../../middleware/validate.js";
import * as userValidation from "../../../validations/user.validation.js";
const userRouter = express.Router();

// User registration and authentication
userRouter.post("/register", validate(userValidation.registerUser), userController.registerUser );
userRouter.post( "/login", validate(userValidation.loginUser), userController.loginUser );

// User management routes
userRouter.get( "/:id", validate(userValidation.getUserById), userController.getUserById );
userRouter.get("/", userController.getAllUsers);
userRouter.put( "/:id", validate(userValidation.getUserById), userController.updateUser);
userRouter.delete("/:id", validate(userValidation.getUserById), userController.deleteUser);
userRouter.patch( "/:id/status", validate(userValidation.toggleUserIsActive), userController.toggleUserIsActive); // Activate/deactivate user

// Profile picture management
userRouter.put("/:id/profilePicture", validate(userValidation.updateProfilePicture), userController.updateProfilePicture);

export default userRouter;
