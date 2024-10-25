import * as tutorApplicationService from "../../../services/v1/tutorServices/tutorApplication.service.js";

export const createTutorApplication = async (req, res) => {
  const response = await tutorApplicationService.createTutorApplication(
    req.body
  );
  res.json(response);
};
