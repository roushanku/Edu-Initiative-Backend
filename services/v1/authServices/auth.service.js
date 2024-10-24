import User from "../../../models/user.model.js";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../../../scerets.js";
import { JWT_EXPIRES_IN } from "../../../scerets.js";
export const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
    return {
      status: false,
      message: "Email already taken",
    };
  }

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
