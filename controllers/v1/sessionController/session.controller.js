import * as sessionService from '../../../services/v1/sessionServices/session.service.js';
export const createSession = async (req, res) => {
  const response = await sessionService.createSession(req.body);
  res.json(response);
}

export const checkSessionExtensionEligibility = async (req, res) => {
  const response = await sessionService.checkSessionExtensionEligibility(req.params.sessionId);
  res.json(response);
}

export const extendSession = async (req, res) => {
  const response = await sessionService.extendSession(req.params.sessionId);
  res.json(response);
}