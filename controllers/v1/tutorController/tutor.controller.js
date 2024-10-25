import * as tutorService from "../../../services/v1/tutorServices/tutor.service.js";

export const createTutorApplication = async (req, res) => {
  const response = await tutorService.createTutorApplication(
    req.body
  );
  res.json(response);
};

export const getTutors = async (req, res) => {
  const response = await tutorService.getTutors();
  res.json(response);
}