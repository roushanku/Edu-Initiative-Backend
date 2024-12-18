import { userService } from '../../../services/index.js';

export const getUserById = async (req, res) => {
  const response = await userService.getUserById(req.params.id);
  return res.json(response);
};

export const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const updateUser = async (req, res) => {
  const response = await userService.updateUser(req.params.id, req.body);
  res.json(response);
};

export const deleteUser = async (req, res) => {
  const response = await userService.deleteUser(req.params.id);
  res.json(response);
};

export const toggleUserIsActive = async (req, res) => {
  const response = await userService.toggleUserIsActive(req.params.id);
  res.json(response);
};

export const updateProfilePicture = async (req, res) => {
  const response = await userService.updateProfilePicture(req.params.id, req.body);
  res.json(response);
};
