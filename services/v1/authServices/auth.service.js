import User from "../../../models/user.model.js";
<<<<<<< HEAD
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../../../scerets.js";
import { JWT_EXPIRES_IN } from "../../../scerets.js";
export const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
=======
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  if (await User.isEmailTaken(data.email)) {
>>>>>>> 60b32d11a6ac343c5902d67d8e29c8e9252d4673
    return {
      status: false,
      message: "Email already taken",
    };
  }
<<<<<<< HEAD

  const userPayload = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  }
  const user = await User.create(userPayload);
  const dataToSend = {
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  };
  console.log(user.name);
=======
  const hashPassword = bcrypt.hashSync(data.password, 10);
  const userPayload = {
    ...data,
    password: hashPassword,
  };
  const user = await User.create(userPayload);
>>>>>>> 60b32d11a6ac343c5902d67d8e29c8e9252d4673
  return {
    status: true,
    message: "User registered successfully",
    data: dataToSend,
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email});
  if(!user) {
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

  const token = jwt.sign({ id: user._id , email : data.email}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    status : true,
    message : "login Successfull",
    token : token
  }
}
