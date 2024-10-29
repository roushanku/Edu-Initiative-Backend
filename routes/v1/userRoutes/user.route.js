import express from "express";
import * as userController from "../../../controllers/v1/userController/user.controller.js";

const userRouter = express.Router();

// User registration and authentication
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

// User management routes
userRouter.get("/:id", userController.getUserById);
userRouter.get("/", userController.getAllUsers);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id/status", userController.toggleUserStatus); // Activate/deactivate user

// Profile picture management
userRouter.put("/:id/profilePicture", userController.updateProfilePicture);

export default userRouter;
