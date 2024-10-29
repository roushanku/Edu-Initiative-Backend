import * as sessionService from '../../../services/v1/sessionServices/session.service.js';
export const createSession = async (req, res) => {
  const response = await sessionService.createSession(req.body);
  res.json(response);
}