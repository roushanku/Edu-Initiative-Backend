import * as authService from "../../../services/v1/authServices/auth.service.js";

export const register = async (req, res) => {
  const response = await authService.createUser(req.body);
  res.json(response);
};

export const login = async (req, res) => {
  const response = await authService.loginUser(req.body);
  res.json(response);
}
