import * as authService from "../../../services/v1/authServices/auth.service.js";

export const register = async (req, res) => {
  const user = await authService.createUser(req.body);
  console.log(user);
  res.json({
    status: true,
    message: "Register",
    data: user,
  });
};
