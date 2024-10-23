import express from "express";
import validate from "../../../middleware/validate.js"; // Make sure this path is correct
import * as authValidator from "../../../validations/auth.validation.js";
import * as authController from "../../../controllers/v1/authController/auth.controller.js";

const authRouter = express.Router();

// Use POST instead of GET for registration
authRouter.post(
  "/register",
  validate(authValidator.register),
  authController.register
);

export default authRouter;
