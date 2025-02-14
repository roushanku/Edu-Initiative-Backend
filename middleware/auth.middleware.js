import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseHandler.js';
import { JWT_SECRET } from '../scerets.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return errorResponse(res, 'Unauthorized', 401);
    }
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return { status: false, message: 'Unauthorized User' };
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Invalid token', 401);
    } else if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token expired', 401);
    } else {
      return errorResponse(res, 'Unauthorized', 401);
    }
  }
};

export const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (!req.user) {
      // return errorResponse(res, 'Please authenticate', 401);
      return res.json({ status: false, message: 'Please authenticate' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      // return errorResponse(res, 'You do not have permission to perform this action', 403);
      return res.json({ status: false, message: 'You do not have permission to perform this action' });
    }
    next();
  };
};
