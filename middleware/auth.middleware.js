import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../scerets.js";
import User from "../models/user.model.js";

const authMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.json({
        status: false,
        message: "Unauthorized",
        token: token,
      });
    }

    try {
      // Verify token
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(payload.userId);

      if (!user) {
        return res.json({
          status: false,
          message: "Unauthorized",
          payload: payload,
        });
      }

      // Check if user's role is within allowedRoles
      if (!allowedRoles.includes(user.role)) {
        return res.json({
          status: false,
          message: "Forbidden: Access denied",
          allowedRoles: allowedRoles,
        });
      }

      // Attach user to request and proceed
      req.user = user;
      next();
    } catch (e) {
      return res.json({
        status: false,
        message: "Unauthorized",
        error: e.message,
      });
    }
  };
};

export default authMiddleware;
