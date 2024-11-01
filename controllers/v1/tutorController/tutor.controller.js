import * as tutorService from "../../../services/v1/tutorServices/tutor.service.js";

export const getTutors = async (req, res) => {
  const response = await tutorService.getTutors();
  res.json(response);
};

export const createTutorApplication = async (req, res) => {
  const response = await tutorService.createTutorApplication(req.body);
  res.json(response);
};

export const hireTutor = async (req, res) => {
  const response = await tutorService.hireTutor(req.body);
  res.json(response);
};

export const createTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.createTutorProfile(req.body);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const response = await tutorService.getTutorById(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllTutors = async (req, res) => {
  try {
    const tutors = await tutorService.getAllTutors();
    res.json({
      status: true,
      message: "Tutors retrieved successfully",
      data: tutors,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.updateTutorProfile( req.params.id, req.body );
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message, });
  }
};

export const deleteTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.deleteTutorProfile(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message, });
  }
};

export const addSubject = async (req, res) => {
  try {
    const response = await tutorService.addSubject( req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message, });
  }
};

export const addAvailability = async (req, res) => {
  try {
    const response = await tutorService.addAvailability( req.params.id, req.body );
    res.json(response);
  } catch (error) {
    res.json({ status: false, error: error.message,});
  }
};

export const updateIsActive = async (req, res) => {
  try {
    const response = await tutorService.updateIsActive( req.params.id, req.body.isActive);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message, });
  }
};
