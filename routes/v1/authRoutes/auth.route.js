import express from "express";
import validate from "../../../middleware/validate.js"; // Make sure this path is correct
import * as authValidator from "../../../validations/auth.validation.js";
import * as authController from "../../../controllers/v1/authController/auth.controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register/student",
  validate(authValidator.registerStudent),
  authController.registerStudent
);

authRouter.post(
  "/register/tutor",
  validate(authValidator.registerTutor),
  authController.registerTutor
);

authRouter.post("/login", validate(authValidator.login), authController.login);
export default authRouter;
