import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

// PORT
export const PORT = process.env.PORT || 3002;

// Database URL
export const MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;
