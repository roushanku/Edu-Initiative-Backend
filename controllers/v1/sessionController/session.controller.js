import { sessionService } from '../../../services/index.js';

export const createSession = async (req, res) => {
  try {
    const response = await sessionService.createSession(req.body);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const listSessions = async (req, res) => {
  try {
    const { userId, role, status, startDate, endDate } = req.query;
    const response = await sessionService.listSessions({
      userId,
      role,
      status,
      startDate,
      endDate,
    });
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const response = await sessionService.getSessionById(req.params.sessionId);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateSessionStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const response = await sessionService.updateSessionStatus(req.params.sessionId, status, reason);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const requestExtension = async (req, res) => {
  try {
    const response = await sessionService.requestExtension(req.params.sessionId, req.body);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateExtensionStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const extension = await sessionService.updateExtensionStatus(req.params.sessionId, req.params.requestId, status, reason);
    res.json(extension);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
