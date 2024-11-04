import logger from '../../../logger.js';
import { hireTutorService, tutorService, addressService, studentService, subjectService } from '../../../services/index.js';

export const createTutorRequest = async (req, res) => {
  try {
    const { studentId, tutorId, addressId, subjectId } = req.body;
    const student = await studentService.getStudentById(studentId);
    if (!student) {
      res.json({ status: false, message: 'Student not found' });
    }
    const tutor = await tutorService.getTutorById(tutorId);
    if (!tutor) {
      res.json({ status: false, message: 'Tutor not found' });
    }
    const address = await addressService.findAddressById(addressId);
    if (!address) {
      res.json({ status: false, message: 'Address not found' });
    }
    const subject = await subjectService.getSubjectById(subjectId);
    if (!subject) {
      res.json({ status: false, message: 'Subject not found' });
    }

    const response = await hireTutorService.createRequest(req.body);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, modeOfStudy } = req.query;
    const response = await hireTutorService.getAllRequests({
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      modeOfStudy,
    });
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorRequestById = async (req, res) => {
  try {
    const response = await hireTutorService.getRequestById(req.params.id);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateTutorRequest = async (req, res) => {
  try {
    const response = await hireTutorService.updateRequest(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteTutorRequest = async (req, res) => {
  try {
    await hireTutorService.deleteRequest(req.params.id);
    res.json({
      status: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorRequestsByStudent = async (req, res) => {
  try {
    const response = await hireTutorService.getRequestsByStudent(req.params.studentId);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorRequestsByTutor = async (req, res) => {
  try {
    const response = await hireTutorService.getRequestsByTutor(req.params.tutorId);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const respondToTutorRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const response = await hireTutorService.respondToRequest(req.params.id, status);
    res.json(response);
  } catch (error) {
    logger.error(error.message);
    res.json({
      status: false,
      message: error.message,
    });
  }
};
