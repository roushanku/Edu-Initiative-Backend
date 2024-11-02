import User from '../../../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorResponse, successResponse } from '../../../utils/responseHandler.js';
import { CustomError } from '../../../utils/responseHandler.js';

// Controller for user login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errorResponse(res, 'Invalid email or password', 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       errorResponse(res, 'Invalid email or password', 401);
    }
    const token = user.generateAuthToken();
     successResponse(res, { token, user }, 'Login successful');

};

export const registerUser = async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });
    await newUser.save();
    return successResponse(res, null, 'User registered successfully', 201);
  } catch (error) {
    next(new CustomError('An error occurred during registration', 500));
  }
};
