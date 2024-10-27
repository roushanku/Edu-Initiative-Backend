import User from "../../../models/user.model.js";
import Student from "../../../models/student.model.js";
import Tutor from "../../../models/tutor.model.js";
import Address from "../../../models/address.model.js";
import bcrypt from "bcryptjs";
import logger from "../../../logger.js";
import { hashPassword } from "../../../utils/hashPassword.js";
import { generateToken } from "../../../utils/generateToken.js";

// const createUser = async (userPayload) => {
//   const user = await User.create(userPayload);
//   return user;
// };

const createAddress = async (addressPayload) => {
  const address = await Address.create(addressPayload);
  return address._id;
};

export const createUserWithRole = async (userData, Model) => {
  try {
    const { email, role } = userData;

    const checkUser = await Model.findOne({ email });
    if (checkUser) {
      return { status: false, message: `${role} email already registered` };
    }

    const addressPayload = {
      type: userData.type,
      label: userData.label,
      town: userData.town,
      city: userData.city,
      state: userData.state,
      country: userData.country,
      zipCode: userData.zipCode,
      location: userData.location,
      additionalInfo: userData.additionalInfo,
      isDefault: userData.isDefault,
    };

    const addressId = createAddress(addressPayload);

    const hashedPassword = await hashPassword(userData.password);
    const userPayload = {
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      addresses: [addressId],
      profilePicture: userData.profilePicture,
      role: userData.role,
      isActive: userData.isActive,
    };

    const user = await createUser(userPayload);

    let payload = {};
    if (role == "Student") {
      payload = {
        userId: user._id,
        gradeLevel: userData.gradeLevel,
        school: userData.school,
        subjects: userData.subjects,
        learningPreferences: userData.learningPreferences,
        parentGuardianInfo: userData.parentGuardianInfo,
      };
    } else {
      payload = {
        userId: user._id,
        education: userData.education,
        experience: userData.experience,
        subjects: userData.subjects,
        availability: userData.availability,
        ratings: userData.ratings,
        bio: userData.bio,
        teachingMethodology: userData.teachingMethodology,
        medium: userData.medium,
        verificationStatus: "Pending",
        documentsSubmitted: userData.documentsSubmitted,
      };
    }

    await Model.create(payload);

    return {
      status: true,
      message: `${role} created successfully`,
      data: {
        user: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      },
    };
  } catch (error) {
    logger.error(`Error creating ${role}: ${error.message}`);
    return { status: false, message: `Error creating ${role}` };
  }
};

export const createStudent = async (studentData) => {
  try {
    const userId = studentData.userId;
    const checkUser = await User.findOne({ _id: userId });

    if (!checkUser) {
      return {
        status: false,
        message: "User does not exist.",
      };
    }

    if (checkUser.role !== "User") {
      return {
        status: false,
        message: "User cannot become a Tutor.",
      };
    }
    const checkStudent = await Student.findOne({ userId: userId });
    if (checkStudent) {
      return {
        status: false,
        message: "Student already exist with this user.",
      };
    }

    const addressPayload = {
      type: studentData.type,
      label: studentData.label,
      town: studentData.town,
      city: studentData.city,
      state: studentData.state,
      country: studentData.country,
      zipCode: studentData.zipCode,
      location: studentData.location,
      additionalInfo: studentData.additionalInfo,
      isDefault: studentData.isDefault,
    };

    // Update the address in the user
    const address = await Address.create(addressPayload);
    const addressId = address._id;

    // Update user by adding addressId to the user
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { addresses: addressId } },
      { new: true }
    );

    const studentPayload = {
      userId: user._id,
      gradeLevel: studentData.gradeLevel,
      school: studentData.school,
      subjects: studentData.subjects,
      learningPreferences: studentData.learningPreferences,
      parentGuardianInfo: studentData.parentGuardianInfo,
    };
    const student = await Student.create(studentPayload);
    return {
      status: true,
      message: "Student created successfully",
      data: student,
    };
  } catch (error) {
    logger.error(`Error creating Student: ${error.message}`);
    return { status: false, message: `Error creating Student` };
  }
};

export const createTutor = async (tutorData) => {
  try {
    const userId = tutorData.userId;
    const checkUser = await User.findOne({ _id: userId });

    if (!checkUser) {
      return {
        status: false,
        message: "User does not exist.",
      };
    }

    if (checkUser.role !== "User") {
      return {
        status: false,
        message: "User cannot become a Tutor.",
      };
    }

    const checkTutor = await Tutor.findOne({ userId: userId });
    if (checkTutor) {
      return {
        status: false,
        message: "Tutor already exist with this user.",
      };
    }

    const addressPayload = {
      type: tutorData.type,
      label: tutorData.label,
      town: tutorData.town,
      city: tutorData.city,
      state: tutorData.state,
      country: tutorData.country,
      zipCode: tutorData.zipCode,
      location: tutorData.location,
      additionalInfo: tutorData.additionalInfo,
      isDefault: tutorData.isDefault,
    };

    // Update the address in the user
    const address = await Address.create(addressPayload);
    const addressId = address._id;

    // Update user by adding addressId to the user
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { addresses: addressId } },
      { new: true }
    );

    const tutorPayload = {
      userId: user._id,
      education: tutorData.education,
      experience: tutorData.experience,
      subjects: tutorData.subjects,
      availability: tutorData.availability,
      ratings: tutorData.ratings,
      bio: tutorData.bio,
      teachingMethodology: tutorData.teachingMethodology,
      medium: tutorData.medium,
      verificationStatus: "Pending",
      documentsSubmitted: tutorData.documentsSubmitted,
    };
    const tutor = await Tutor.create(tutorPayload);
    return {
      status: true,
      message: "Tutor create successfully",
      data: tutor,
    };
  } catch (error) {
    logger.error(`Error creating Tutor: ${error.message}`);
    return { status: false, message: `Error creating Tutor` };
  }
};

export const loginUser = async (data) => {
  try {
    const { idNumber, password } = data;
    const user = await User.findOne({ idNumber });
    if (!user) {
      return { status: false, message: "User not found" };
    }

    const userId = user._id;
    const role = user.role;

    if (role === "Student") {
      return loginStudent({ userId, password });
    } else if (role === "Tutor") {
      return loginTutor({ userId, password });
    }

    return { status: false, message: "Invalid role" };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return { status: false, message: "Login error" };
  }
};

const loginHandler = async (userId, password, Model) => {
  try {
    const user = await Model.findOne({ userId });
    if (!user) {
      return { status: false, message: `${Model.modelName} not found` };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: false, message: "Invalid password" };
    }

    const token = generateToken(user._id, user.email, userId);
    return {
      status: true,
      message: "Login Successful",
      token,
    };
  } catch (error) {
    logger.error(`Error logging in ${Model.modelName}: ${error.message}`);
    return { status: false, message: `Error logging in ${Model.modelName}` };
  }
};

export const loginTutor = async (data) => {
  return await loginHandler(data.userId, data.password, Tutor);
};

export const loginStudent = async (data) => {
  return await loginHandler(data.userId, data.password, Student);
};

export const createUser = async (userData) => {
  try {
    const { email, role } = userData;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return { status: false, message: `${role} email already registered` };
    }

    const hashedPassword = await hashPassword(userData.password);
    const userPayload = {
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      profilePicture: userData.profilePicture,
      role: userData.role,
      isActive: userData.isActive,
    };
    const user = await User.create(userPayload);
    return {
      status: true,
      message: `${role} created successfully`,
      data: {
        user: {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      },
    };
  } catch (error) {
    logger.error(`Error creating User: ${error.message}`);
    return { status: false, message: `Error creating User` };
  }
};
