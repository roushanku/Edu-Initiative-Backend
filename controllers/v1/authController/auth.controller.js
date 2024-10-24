import * as authService from "../../../services/v1/authServices/auth.service.js";
import { password } from "../../../validations/custom.validation.js";

export const registerStudent = async (req, res) => {
  const response = await authService.createStudent(req.body);
  res.json(response);
};

export const registerTutor = async (req, res) => {
  const response = await authService.createTutor(req.body);
  res.json(response);
};

export const login = async (req, res) => {
  const response = await authService.loginUser(req.body);
  res.json(response);
};
