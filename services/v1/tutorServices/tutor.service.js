import TutorApplication from "../../../models/tutorapplications.model.js";
import HireTutor from "../../../models/hireTutor.model.js";
import Tutor from "../../../models/tutor.model.js";
import logger from "../../../logger.js"; // Assuming you have a logger utility
import { checkSubject } from "../subjectServices/subject.service.js";
import { checkStudent } from "../studentServices/student.service.js";

const checkTutor = async (tutorId) => {
  const tutor = await Tutor.findById(tutorId);
  return tutor
    ? { status: true, tutor }
    : { status: false, message: "Tutor not found" };
};

export const createTutorApplication = async (data) => {
  try {
    const tutorApplication = await TutorApplication.create(data);
    return {
      status: true,
      message: "Tutor application created",
      data: tutorApplication,
    };
  } catch (error) {
    logger.error(`Error creating tutor application: ${error.message}`);
    return { status: false, message: "Error creating tutor application" };
  }
};

export const getTutors = async () => {
  try {
    const tutors = await TutorApplication.find();
    return {
      status: true,
      message: "Tutors fetched",
      data: tutors,
    };
  } catch (error) {
    logger.error(`Error fetching tutors: ${error.message}`);
    return { status: false, message: "Error fetching tutors" };
  }
};

export const hireTutor = async (data) => {
  // Another method of checking
  /*
  const [checkStudent, checkTutor, checkSubject] = await Promise.all([
    Student.findById(data.studentId),
    Tutor.findById(data.tutorId),
    Subject.findById(data.subjectId),
  ]);  
  */

  const studentCheck = await checkStudent(data.studentId);
  if (!studentCheck.status) {
    return studentCheck;
  }

  const tutorCheck = await checkTutor(data.tutorId);
  if (!tutorCheck.status) {
    return tutorCheck;
  }

  const subjectCheck = await checkSubject(data.subjectId);
  if (!subjectCheck.status) {
    return subjectCheck;
  }

  try {
    const application = await HireTutor.create(data);
    return {
      status: true,
      message: "Tutor hired",
      data: application,
    };
  } catch (error) {
    logger.error(`Error hiring tutor: ${error.message}`);
    return { status: false, message: "Error hiring tutor" };
  }
};

export const createTutorProfile = async (data) => {
  const tutor = new Tutor(data);
  return await tutor.save();
};

export const getTutorById = async (id) => {
  return await Tutor.findById(id).populate("userId");
};

export const getAllTutors = async () => {
  return await Tutor.find().populate("userId");
};

export const updateTutorProfile = async (id, data) => {
  return await Tutor.findByIdAndUpdate(id, data, { new: true }).populate(
    "userId"
  );
};

export const deleteTutorProfile = async (id) => {
  return await Tutor.findByIdAndDelete(id);
};

export const addSubject = async (id, subject) => {
  const tutor = await Tutor.findById(id);
  if (!tutor) throw new Error("Tutor not found");

  tutor.subjects.push(subject);
  return await tutor.save();
};

export const updateAvailability = async (id, availability) => {
  const tutor = await Tutor.findById(id);
  if (!tutor) throw new Error("Tutor not found");

  tutor.availability = availability;
  return await tutor.save();
};

export const updateVerificationStatus = async (id, status) => {
  const tutor = await Tutor.findById(id);
  if (!tutor) throw new Error("Tutor not found");

  tutor.verificationStatus = status;
  return await tutor.save();
};
