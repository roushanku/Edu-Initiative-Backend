import * as authService from "../../../services/v1/authServices/auth.service.js";

export const register = async (req, res) => {
  const response = await authService.createUser(req.body);
  res.json(response);
};
