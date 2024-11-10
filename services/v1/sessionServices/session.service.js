import Session from '../../../models/session.model.js';
import { notificationService, hireTutorService } from '../../../services/index.js';

export const createSession = async (sessionData) => {
  const { hireRequestId } = sessionData;

  const hireRequest = await hireTutorService.getRequestById(hireRequestId);
  if (!hireRequest) return { status: false, message: 'Hire request not found' };

  const existingSession = await getSessionByHireRequestId(hireRequestId);
  if (existingSession) return { status: false, message: 'Session already exists for this hire request' };

  const addressId = hireRequest.data.addressId._id;
  sessionData.tutorId = hireRequest.data.tutorId;
  sessionData.studentId = hireRequest.data.studentId;
  sessionData.location = { addressId };

  const session = new Session(sessionData);
  await session.save();

  // Notify relevant parties
  await notificationService.createNotification({
    userId: session.tutorId,
    title: 'New Session Created',
    message: `A new session has been scheduled`,
    type: 'SESSION_CREATED',
    relatedEntityId: session._id,
    relatedEntityType: 'Session',
  });

  return {
    status: true,
    message: 'Session created successfully',
    data: session,
  };
};

export const listSessions = async (filters) => {
  const query = {};

  if (filters.userId) {
    if (filters.role === 'tutor') {
      query.tutorId = filters.userId;
    } else if (filters.role === 'student') {
      query.studentId = filters.userId;
    }
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.startDate || filters.endDate) {
    query.startDate = {};
    if (filters.startDate) query.startDate.$gte = new Date(filters.startDate);
    if (filters.endDate) query.startDate.$lte = new Date(filters.endDate);
  }

  const session = await Session.find(query).populate('tutorId', 'userId').populate('studentId', 'userId').populate('location.addressId').sort({ startDate: -1 });
  return {
    status: true,
    message: 'Session fetched successfully',
    data: session,
  };
};

export const getSessionById = async (sessionId) => {
  const session = await Session.findById(sessionId).populate('tutorId', 'userId').populate('studentId', 'userId').populate('location.addressId');
  console.log(session);
  return { status: true, message: 'Session fetched successfully', data: session };
};

export const getSessionByHireRequestId = async (hireRequestId) => {
  const session = await Session.findOne({ hireRequestId }).populate('tutorId', 'userId').populate('studentId', 'userId').populate('location.addressId');
  return { status: true, message: 'Session fetched successfully', data: session };
};

export const updateSessionStatus = async (sessionId, status, reason) => {
  const session = await Session.findById(sessionId);
  if (!session) return { status: false, message: 'Session not found' };

  session.status = status;
  if (reason) session.cancellationReason = reason;

  await session.save();

  // Notify relevant parties about status change
  await notificationService.createNotification({
    userId: session.tutorId,
    title: 'Session Status Updated',
    message: `Session status has been updated to ${status}`,
    type: 'SESSION_STATUS_UPDATE',
    relatedEntityId: session._id,
    relatedEntityType: 'Session',
  });

  return {
    status: true,
    message: 'Session status updated successfully',
    data: session,
  };
};

export const requestExtension = async (sessionId, extensionData) => {
  const session = await Session.findById(sessionId);
  if (!session) return { status: false, message: 'Session not found' };

  session.extensionRequest.push({
    ...extensionData,
    status: 'PENDING_TUTOR_APPROVAL',
    requestedDate: new Date(),
  });

  await session.save();

  // Notify tutor about extension request
  await notificationService.createNotification({
    userId: session.tutorId,
    title: 'Session Extension Request',
    message: 'A student has requested to extend the session',
    type: 'EXTENSION_REQUEST',
    relatedEntityId: session._id,
    relatedEntityType: 'Session',
  });

  return {
    status: true,
    message: 'Extension request sent successfully',
    data: session,
  };
};

export const updateExtensionStatus = async (sessionId, requestId, status, reason) => {
  const session = await Session.findById(sessionId);
  if (!session) return { status: false, message: 'Session not found' };

  const extensionRequest = session.extensionRequest.id(requestId);
  if (!extensionRequest) return { status: false, message: 'Extension request not found' };

  extensionRequest.status = status;
  if (reason) extensionRequest.reason = reason;
  if (status === 'APPROVED') extensionRequest.approvedDate = new Date();

  await session.save();

  // Notify student about extension request status
  await notificationService.createNotification({
    userId: session.studentId,
    title: 'Extension Request Update',
    message: `Your extension request has been ${status}`,
    type: 'EXTENSION_STATUS_UPDATE',
    relatedEntityId: session._id,
    relatedEntityType: 'Session',
  });

  return {
    status: true,
    message: 'Extension request status updated successfully',
    data: session,
  };
};
