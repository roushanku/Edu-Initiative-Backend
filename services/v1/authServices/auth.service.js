import User from "../../../models/user.model.js";
import Student from "../../../models/student.model.js";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../../../scerets.js";
import { JWT_EXPIRES_IN } from "../../../scerets.js";
export const createUser = async (userData) => {
  const email = userData.email;
  const idNumber = userData.idNumber;
  const role = userData.role;

  const student = await Student.findOne({ email });
  if (student) {
    return {
      status: false,
      message: "Student email already registered",
    };
  }
  const user = await User.findOne({ idNumber });
  if (user) {
    return {
      status: false,
      message: "User id number already registered",
    };
  }

  if (role === "Student") {
    const studentPayload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: bcrypt.hashSync(userData.password, 10),
    };
    const student = await Student.create(studentPayload);
    return {
      status: true,
      message: "Student registered successfully",
      data: {
        name: student.name,
        email: student.email,
        role: student.role,
        phone: student.phone,
      },
    };
  }

  const tutorPayload = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: bcrypt.hashSync(userData.password, 10),
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: false,
      message: "User not found",
    };
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    return {
      status: false,
      message: "Invalid password",
    };
  }

  const token = jwt.sign({ id: user._id, email: data.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    status: true,
    message: "login Successfull",
    token: token,
  };
};
