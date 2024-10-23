import User from "../../../models/user.model.js";

export const createUser = async (data) => {
  if (await User.isEmailTaken(data.email)) {
    return {
      status: false,
      message: "Email already taken",
    };
  }
  const user = await User.create(data);
  return {
    status: true,
    message: "User registered successfully",
    data: user,
  };
};
