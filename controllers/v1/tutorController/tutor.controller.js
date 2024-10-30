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
    const tutor = await tutorService.createTutorProfile(req.body);
    if (!tutor) {
      return res.json({
        status: false,
        message: "Tutor profile creation failed",
      });
    }
    res.json({
      status: true,
      message: "Tutor profile created successfully",
      data: tutor,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const tutor = await tutorService.getTutorById(req.params.id);
    if (!tutor) {
      return res.json({
        status: false,
        message: "Tutor not found",
      });
    }
    res.json({
      status: true,
      message: "Tutor retrieved successfully",
      data: tutor,
    });
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
    const updatedTutor = await tutorService.updateTutorProfile(
      req.params.id,
      req.body
    );
    if (!updatedTutor) {
      return res.json({
        status: false,
        message: "Tutor profile update failed",
      });
    }
    res.json({
      status: true,
      message: "Tutor profile updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteTutorProfile = async (req, res) => {
  try {
    const deletedTutor = await tutorService.deleteTutorProfile(req.params.id);
    if (!deletedTutor) {
      return res.json({
        status: false,
        message: "Failed to delete tutor profile",
      });
    }
    res.json({
      status: true,
      message: "Tutor profile deleted successfully",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const addSubject = async (req, res) => {
  try {
    const updatedTutor = await tutorService.addSubject(
      req.params.id,
      req.body.subject
    );
    res.json({
      status: true,
      message: "Subject added successfully",
      data: updatedTutor,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const updatedTutor = await tutorService.updateAvailability(
      req.params.id,
      req.body.availability
    );
    res.json({
      status: true,
      message: "Availability updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const updatedTutor = await tutorService.updateVerificationStatus(
      req.params.id,
      req.body.status
    );
    res.json({
      status: true,
      message: "Verification status updated successfully",
      data: updatedTutor,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
