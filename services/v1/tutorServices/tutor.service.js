import TutorApplication from '../../../models/tutorapplications.model.js';
import HireTutor from '../../../models/hireTutor.model.js';
import Tutor from '../../../models/tutor.model.js';
import User from '../../../models/user.model.js';
import logger from '../../../logger.js'; // Assuming you have a logger utility
import { getSubjectById } from '../subjectServices/subject.service.js';
import { checkStudent } from '../studentServices/student.service.js';

const checkTutor = async (tutorId) => {
  const tutor = await Tutor.findById(tutorId);
  return tutor ? { status: true, tutor } : { status: false, message: 'Tutor not found' };
};

export const createTutorApplication = async (user, data) => {
  try {
    const userId = user.id;
    if (user.role === 'Tutor') {
      return { status: false, message: 'User is already a tutor.' };
    }

    const existingApplication = await TutorApplication.findOne({ userId });
    if (existingApplication) {
      return { status: false, message: 'Tutor application already exists for this user' };
    }

    data.applicationStatus = 'PENDING';
    const tutorApplication = await TutorApplication.create(data);

    return { status: true, message: 'Tutor application created', data: tutorApplication };
  } catch (error) {
    logger.error(`Error creating tutor application: ${error.message}`);
    return { status: false, message: 'Error creating tutor application' };
  }
};

export const getTutors = async () => {
  try {
    const tutors = await TutorApplication.find();
    return {
      status: true,
      message: 'Tutors fetched',
      data: tutors,
    };
  } catch (error) {
    logger.error(`Error fetching tutors: ${error.message}`);
    return { status: false, message: 'Error fetching tutors' };
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

  const subjectCheck = await getSubjectById(data.subjectId);
  if (!subjectCheck.status) {
    return subjectCheck;
  }

  try {
    const application = await HireTutor.create(data);
    return {
      status: true,
      message: 'Tutor hired',
      data: application,
    };
  } catch (error) {
    logger.error(`Error hiring tutor: ${error.message}`);
    return { status: false, message: 'Error hiring tutor' };
  }
};

export const createTutorProfile = async (data) => {
  const userId = data.userId;
  const user = await User.findById(userId);
  if (!user) {
    return { status: false, message: 'User not found' };
  }
  if (user.role !== 'User') {
    return { status: false, message: 'User cannot become tutor' };
  }
  const existingTutor = await Tutor.findOne({ userId });
  if (existingTutor) {
    return { status: false, message: 'Tutor already exists for this user' };
  }
  let tutor = new Tutor(data);
  tutor = await tutor.save();
  return { status: true, message: 'Tutor profile created', data: tutor };
};

export const getTutorById = async (id) => {
  const tutor = await Tutor.findById(id).populate();
  if (!tutor) {
    return { status: false, message: 'Tutor not found' };
  }
  return { status: true, message: 'Tutor retrived successfully', data: tutor };
};

export const getAllTutors = async (filters) => {
  try {
    let allTutor = await Tutor.find().populate('userId');

    if (allTutor.length === 0) {
      return { status: false, message: 'No tutors found' };
    }

    const { priceRange, rating, teachingMethodology, medium, subjects } = filters;

    if (priceRange) {
      allTutor = allTutor.filter((tutor) => tutor.subjects.map((subject) => subject.hourlyRate >= priceRange.min && subject.hourlyRate <= priceRange.max).includes(true));
    }

    if (rating) {
      allTutor = allTutor.filter((tutor) => tutor.ratings.averageRating >= rating);
    }

    if (teachingMethodology) {
      allTutor = allTutor.filter((tutor) => tutor.teachingMethodology === teachingMethodology);
    }

    if (medium) {
      console.log(medium);
      allTutor = allTutor.filter((tutor) => tutor.medium.includes(medium));
    }

    // if (subjects) {
    //   allTutor = allTutor.filter((tutor) => tutor.subjects.map((subject) => subjects.includes(subject.subjectId.toString())));
    // }

    return { status: true, message: 'Tutors retrieved successfully', data: allTutor };
  } catch (error) {
    console.error('Error fetching tutors:', error);
    throw new Error(`Error fetching tutors: ${error.message}`);
  }
};

export const updateTutorProfile = async (id, data) => {
  const updatedTutor = await Tutor.findByIdAndUpdate(id, data, { new: true }).populate('userId');
  if (!updatedTutor) {
    return { status: false, message: 'Tutor profile update failed' };
  }
  return { status: true, message: 'Tutor profile updated', data: updatedTutor };
};

export const deleteTutorProfile = async (id) => {
  const tutor = await Tutor.findByIdAndDelete(id);
  if (!tutor) {
    return { status: false, message: 'Tutor not found' };
  }
  return { status: true, message: 'Tutor deleted' };
};

export const addSubject = async (id, subject) => {
  const subjectId = subject.subjectId;
  const tutor = await Tutor.findById(id);

  if (!tutor) {
    return { status: false, message: 'Tutor not found' };
  }
  const isSubjectAlreadyPresent = tutor.subjects.some((existingSubject) => existingSubject.subjectId.toString() === subjectId.toString());

  if (isSubjectAlreadyPresent) {
    return { status: false, message: "Subject is already present in the tutor's list" };
  }
  tutor.subjects.push(subject);
  const updatedTutor = await tutor.save();

  return { status: true, message: 'Subject added', data: updatedTutor };
};

export const addAvailability = async (id, newAvailability) => {
  const tutor = await Tutor.findById(id);
  if (!tutor) throw new Error('Tutor not found');

  // Helper function to compare times as strings
  const isTimeOverlap = (start1, end1, start2, end2) => {
    return (start1 >= start2 && start1 < end2) || (end1 > start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2);
  };

  // Check if the new availability overlaps with existing entries
  for (const existingSlot of tutor.availability) {
    if (existingSlot.dayOfWeek === newAvailability.dayOfWeek && isTimeOverlap(newAvailability.startTime, newAvailability.endTime, existingSlot.startTime, existingSlot.endTime)) {
      return {
        status: false,
        message: `Time slot overlaps with existing availability on ${existingSlot.dayOfWeek} from ${existingSlot.startTime} to ${existingSlot.endTime}`,
      };
    }
  }

  // Add the new availability if there are no overlaps
  tutor.availability.push(newAvailability);
  const updatedTutor = await tutor.save();

  return {
    status: true,
    message: 'Availability added',
    data: updatedTutor,
  };
};

export const updateIsActive = async (id, isActive) => {
  let tutor = await Tutor.findById(id);
  if (!tutor) throw new Error('Tutor not found');

  tutor.isActive = isActive;
  tutor = await tutor.save();
  return { status: true, message: 'Tutor active status updated', data: tutor };
};
