import authServices from '../../../services/v1/authServices/auth.service.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const response = await authServices.loginUser(email, password);
  return res.json(response);
};

const registerUser = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: 'Student',
    phoneNumber: req.body.phoneNumber,
  };
  const response = await authServices.registerUser(userData);
  return res.json(response);
};

const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const response = await authServices.verifyToken(token);
  res.json(response);
};

export default {
  loginUser,
  registerUser,
  verifyToken,
};
