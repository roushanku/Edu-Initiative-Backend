import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../scerets.js";

// Utility to generate JWT token
export const generateToken = (id, email, userId) => {
  return jwt.sign({ id, email, userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
