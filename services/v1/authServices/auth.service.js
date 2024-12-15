import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../../models/user.model.js';
import { JWT_SECRET } from '../../../scerets.js';

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { status: false, message: 'Invalid email or password' };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: false, message: 'Invalid email or password' };
  }
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '48h' });
  return { status: true, message: 'Login successful', data: { token, user } };
};

const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  const user = await User.create(userData);
  return { status: true, message: 'User registered successfully', data: user };
};

export default {
  loginUser,
  registerUser,
};
