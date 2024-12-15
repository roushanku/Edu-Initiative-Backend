import { userService } from '../../../services/index.js';
export const registerUser = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'Student',
      phoneNumber: req.body.phoneNumber,
    };
    const user = await userService.registerUser(userData);
    if (!user) {
      return res.json({
        status: false,
        message: 'User registration failed',
      });
    }
    res.json({
      status: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.json({
        status: false,
        message: 'Login failed',
      });
    }
    res.json({
      status: true,
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.json({
        status: false,
        message: 'User not found',
      });
    }
    res.json({
      status: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      status: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.json({
        status: false,
        message: 'User update failed',
      });
    }
    res.json({
      status: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userDeleted = await userService.deleteUser(req.params.id);
    if (!userDeleted) {
      return res.json({
        status: false,
        message: 'User deletion failed',
      });
    }
    res.json({
      status: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const toggleUserIsActive = async (req, res) => {
  try {
    const updatedUser = await userService.toggleUserStatus(req.params.id);
    if (!updatedUser) {
      return res.json({
        status: false,
        message: 'Failed to update user status',
      });
    }
    res.json({
      status: true,
      message: 'User status updated',
      data: updatedUser,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfilePicture(req.params.id, req.body.profilePicture);
    if (!updatedUser) {
      return res.json({
        status: false,
        message: 'Profile picture update failed',
      });
    }
    res.json({
      status: true,
      message: 'Profile picture updated',
      data: updatedUser,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
