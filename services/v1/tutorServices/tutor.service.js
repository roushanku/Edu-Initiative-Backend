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
