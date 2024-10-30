import mongoose from "mongoose";
const { Schema } = mongoose;

// User Schema - Updated
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: String,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }], // Reference to Address schema
  profilePicture: String,
  role: {
    type: String,
    enum: ["Student", "Tutor", "Admin", "User"],
    required: true,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

export default User;
