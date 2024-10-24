import * as authService from "../../../services/v1/authServices/auth.service.js";
import { password } from "../../../validations/custom.validation.js";

export const register = async (req, res) => {
  try {
    const { role } = req.body;
    let idNumber = "";
    if (role === "Student") {
      idNumber = `S${Date.now()}`; // 'S' followed by timestamp
    } else if (role === "Tutor") {
      idNumber = `T${Date.now()}`; // 'T' followed by timestamp
    } else {
      return res.json({ status: false, message: "Invalid role" });
    }
    const response = await authService.createUser({ ...req.body, idNumber });
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
  const response = await authService.loginUser(req.body);
  res.json(response);
};
