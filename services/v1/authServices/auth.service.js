import User from "../../../models/user.model.js";
import Student from "../../../models/student.model.js";
import Tutor from "../../../models/tutor.model.js";
import bcrypt from "bcryptjs";
import logger from "../../../logger.js";
import { hashPassword } from "../../../utils/hashPassword.js";
import { generateToken } from "../../../utils/generateToken.js";

const createUser = async (role, idPrefix) => {
  const idNumber = `${idPrefix}${Date.now()}`;
  const user = await User.create({ role, idNumber });
  return user._id;
};

export const createUserWithRole = async (userData, Model, idPrefix) => {
  try {
    const { email, role, password } = userData;

    const checkUser = await Model.findOne({ email });
    if (checkUser) {
      return { status: false, message: `${role} email already registered` };
    }

    const userId = await createUser(role, idPrefix);
    const hashedPassword = await hashPassword(password);

    const payload = { ...userData, userId, password: hashedPassword };
    const user = await Model.create(payload);

    return {
      status: true,
      message: `${role} created successfully`,
      data: {
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
    };
  } catch (error) {
    logger.error(`Error creating ${role}: ${error.message}`);
    return { status: false, message: `Error creating ${role}` };
  }
};

export const createStudent = async (userData) => {
  return await createUserWithRole(userData, Student, "S");
};

export const createTutor = async (userData) => {
  return await createUserWithRole(userData, Tutor, "T");
};

export const loginUser = async (data) => {
  try {
    const { idNumber, password } = data;
    const user = await User.findOne({ idNumber });
    if (!user) {
      return { status: false, message: "User not found" };
    }

    const userId = user._id;
    const role = user.role;

    if (role === "Student") {
      return loginStudent({ userId, password });
    } else if (role === "Tutor") {
      return loginTutor({ userId, password });
    }

    return { status: false, message: "Invalid role" };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return { status: false, message: "Login error" };
  }
};

const loginHandler = async (userId, password, Model) => {
  try {
    const user = await Model.findOne({ userId });
    if (!user) {
      return { status: false, message: `${Model.modelName} not found` };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: false, message: "Invalid password" };
    }

    const token = generateToken(user._id, user.email);
    return {
      status: true,
      message: "Login Successful",
      token,
    };
  } catch (error) {
    logger.error(`Error logging in ${Model.modelName}: ${error.message}`);
    return { status: false, message: `Error logging in ${Model.modelName}` };
  }
};

export const loginTutor = async (data) => {
  return await loginHandler(data.userId, data.password, Tutor);
};

export const loginStudent = async (data) => {
  return await loginHandler(data.userId, data.password, Student);
};
