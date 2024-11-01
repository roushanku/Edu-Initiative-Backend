import { subjectService } from "../../../services/index.js";

export const getAllSubjects = async (req, res) => {
  try {
    const response = await subjectService.getAllSubjectsService();
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const response = await subjectService.getSubjectById(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const response = await subjectService.createSubject(req.body);
    res.json(response);
  } catch (error) {
    res.json({status: false, message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const response = await subjectService.updateSubject(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({status: false, message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const response = await subjectService.deleteSubject(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
