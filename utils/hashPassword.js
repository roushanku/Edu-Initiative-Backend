import bcrypt from "bcryptjs";

// Utility for password hashing
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 8);
};
