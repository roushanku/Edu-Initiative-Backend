import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    enum: ["Student", "Tutor"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
    },
    private: true, // used by the toJSON plugin
  },
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isPhoneNumberTaken = async function (phone, excludeUserId) {
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

export default User;
