import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

// PORT
export const PORT = process.env.PORT || 3002;

// Database URL
export const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;