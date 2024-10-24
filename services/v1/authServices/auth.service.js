import User from "../../../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  if (await User.isEmailTaken(data.email)) {
    return {
      status: false,
      message: "Email already taken",
    };
  }
  const hashPassword = bcrypt.hashSync(data.password, 10);
  const userPayload = {
    ...data,
    password: hashPassword,
  };
  const user = await User.create(userPayload);
  return {
    status: true,
    message: "User registered successfully",
    data: user,
  };
};
