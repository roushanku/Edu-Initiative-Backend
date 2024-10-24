import * as authService from "../../../services/v1/authServices/auth.service.js";
import { password } from "../../../validations/custom.validation.js";

export const register = async (req, res) => {
  const response = await authService.createUser(req.body);
  res.json(response);
};
