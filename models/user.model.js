import mongoose from "mongoose";
import Student from "./student.model";
import Tutor from "./tutor.model";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  student: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Student",
  },
  tutor: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Tutor",
  }
} , {timestamps : true});

const User = mongoose.model("User", userSchema);
export default User;
