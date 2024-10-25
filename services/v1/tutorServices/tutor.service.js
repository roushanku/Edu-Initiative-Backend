import TutorApplication from "../../../models/tutorapplications.model.js";

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
