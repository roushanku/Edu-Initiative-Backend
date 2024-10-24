import * as subjectService from "../../../services/v1/subjectServices/subject.service.js";
import { password } from "../../../validations/custom.validation.js";

export const createSubject = async (req, res) => {
  const response = await subjectService.createSubject(req.body);
  res.json(response);
};
