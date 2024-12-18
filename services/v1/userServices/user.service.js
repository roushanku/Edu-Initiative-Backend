import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../../models/user.model.js';

export const checkUser = async (userId) => {
  const user = await User.findById(userId);
  return user ? { status: true, user } : { status: false, message: 'User not found' };
};

export const getUserById = async (id) => {
  const user = await User.findById(id).populate('addresses');
  if (!user) {
    return { status: false, message: 'User not found' };
  }
  return { status: true, message: 'User fetched successfully', data: user };
};

export const getAllUsers = async () => {
  const users = await User.find();
  return { status: true, message: 'Users retrieved successfully', data: users };
};

export const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updatedUser) {
    return { status: false, message: 'User update failed' };
  }
  return { status: true, message: 'User updated successfully', data: updatedUser };
};

export const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return { status: false, message: 'User not found' };
  }
  await User.findByIdAndDelete(id);
  return { status: true, message: 'User deleted successfully' };
};

export const toggleUserStatus = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return { status: false, message: 'User not found' };
  }
  const updated = await User.findByIdAndUpdate(id, { isActive: !user.isActive }, { new: true });
  return { status: true, message: 'User status updated successfully', data: updated };
};

export const updateProfilePicture = async (id, profilePicture) => {
  const updated = await User.findByIdAndUpdate(id, { profilePicture }, { new: true });
  return { status: true, message: 'Profile picture updated successfully', data: updated };
};
