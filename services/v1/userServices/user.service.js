import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../../models/user.model.js";

export const checkUser = async (userId) => {
  const user = await User.findById(userId);
  return user
    ? { status: true, user }
    : { status: false, message: "User not found" };
};

export const registerUser = async (data) => {
  const { email, password, firstName, lastName, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
  });
  return await user.save();
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { user, token };
};

export const getUserById = async (id) => {
  return await User.findById(id).populate("addresses");
};

export const getAllUsers = async () => {
  return await User.find();
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const toggleUserStatus = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.isActive = !user.isActive;
  return await user.save();
};

export const updateProfilePicture = async (id, profilePicture) => {
  return await User.findByIdAndUpdate(id, { profilePicture }, { new: true });
};
