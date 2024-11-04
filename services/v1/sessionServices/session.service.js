import Session from '../../../models/session.model.js';
import HireTutor from '../../../models/hireTutor.model.js';
import Tutor from '../../../models/tutor.model.js';
import Student from '../../../models/student.model.js';

export const createSession = async (sessionData) => {
  try {
    const hireRequesId = sessionData.hireRequestId;
    const hireRequest = await HireTutor.findById(hireRequesId);

    if (!hireRequest) {
      return { status: false, message: 'Hire request not found' };
    }

    const tutorId = sessionData.tutorId;
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return { status: false, message: 'Tutor not found' };
    }

    const studentId = sessionData.studentId;
    const student = await Student.findById(studentId);

    if (!student) {
      return { status: false, message: 'Student not found' };
    }
    const startDate = sessionData.startDate;
    const endDate = sessionData.endDate;

    if (startDate > endDate) {
      return { status: false, message: 'Start date cannot be after end date' };
    }

    const newSession = await Session.create(sessionData);
    return {
      status: true,
      message: 'Session created successfully',
      data: newSession,
    };
  } catch {
    logger.error(`Error creating session: ${error.message}`);
    return { status: false, message: 'Error creating session' };
  }
};

export const checkSessionExtensionEligibility = async (sessionId) => {
  const session = await Session.findById(sessionId);
  if (!session) {
    return { status: false, message: 'Session not found' };
  }

  if (session.status !== 'ONGOING') {
    return { status: false, message: 'Only ongoing session can be extended' };
  }

  // Check for existing pending requests
  const hasPendingRequest = session.extensionRequest.some((req) => req.status === 'PENDING_TUTOR_APPROVAL' || req.status === 'PAYMENT_PENDING' || req.status === 'PENDING_ADMIN_APPROVAL');

  if (hasPendingRequest) {
    return {
      status: false,
      requestStatus: session.extensionRequest.status,
      message: 'Session already has a pending extension request',
    };
  }

  const daysUntilEnd = differenceInDays(session.endDate, new Date());

  // Check if within 5-day window
  const isWithinWindow = daysUntilEnd < 5;

  return {
    status: true,
    message: 'Session is eligible to extend',
    data: {
      eligible: isWithinWindow && !hasExtensionRequest,
      currentEndDate: session.endDate,
    },
  };
};

export const extendSession = async (sessionId, extensionDuration) => {
  const eligibility = await checkSessionExtensionEligibility(sessionId);
  if (!eligibility.data.eligible) {
    return {
      status: false,
      message: 'Session is not eligible to extend',
    };
  }

  const session = await Session.findById(sessionId);
  const newEndDate = addMonths(session.endDate, extensionDuration);

  //send notification to tutor and Admin regarding session extension -- to be implemented

  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    {
      $push: {
        extensionRequest: {
          status: 'PENDING_TUTOR_APPROVAL',
          reason: 'Session extension',
          requestedDate: new Date(),
        },
      },
    },
    { new: true }
  );

  return {
    status: true,
    message: 'Session extended successfully',
    data: updatedSession,
  };
};

export const handleTutorResponseForExtension = async (sessionId, action) => {
  const session = await Session.findById(sessionId);

  if (!session) {
    return {
      status: false,
      message: 'Session not found',
    };
  }

  const currentRequest = session.extensionRequest[session.extensionRequest.length() - 1];
  if (currentRequest.status !== 'PENDING_TUTOR_APPROVAL') {
    return {
      status: false,
      message: 'No pending extension request found',
    };
  }

  const newStatus = action === 'accept' ? 'PAYMENT_PENDING' : 'REJECTED';

  const updatedSession = await Session.findOneAndUpdate(
    {
      _id: sessionId,
      'extensionRequest.status': 'PENDING_TUTOR_APPROVAL',
    },
    {
      $set: {
        'extensionRequest.$.status': newStatus,
        'extensionRequest.$.tutorResponseDate': new Date(),
      },
    },
    { new: true }
  );

  // Notify student about tutor's response

  return {
    status: true,
    message: 'Extension Session accpeted by tutor',
    data: updatedSession,
  };
};

export const handleAdminApprovalForExtension = async (sessionId, action) => {
  const session = await Session.findById(sessionId);
  if (!session) {
    return { status: false, message: 'Session not found' };
  }

  const currentRequest = session.extensionRequest[session.extensionRequest.length() - 1];

  if (currentRequest.status !== 'PENDING_ADMIN_APPROVAL') {
    return {
      status: false,
      message: 'Extension Request is not in pending admin approval state',
    };
  }

  if (action === 'approve') {
    const newEndDate = addMonths(session.endDate, currentRequest.extensionDuration);

    const updatedSession = await Session.findOneAndUpdate(
      {
        _id: sessionId,
        'extensionRequest.status': 'PENDING_ADMIN_APPROVAL',
      },
      {
        $set: {
          endDate: newEndDate,
          'extensionRequest.$.status': 'APPROVED',
          'extensionRequest.$.approvedDate': new Date(),
        },
      },
      { new: true }
    );

    // Notify both tutor and student about approval

    return {
      status: true,
      message: 'Extension request approved by admin',
      data: updatedSession,
    };
  } else {
    // Handle rejection (might need to process refund)
    const updatedSession = await Session.findOneAndUpdate(
      {
        _id: sessionId,
        'extensionRequest.status': 'PENDING_ADMIN_APPROVAL',
      },
      {
        $set: {
          'extensionRequest.$.status': 'REJECTED',
          'extensionRequest.$.approvedDate': new Date(),
        },
      },
      { new: true }
    );

    // Notify both parties about rejection

    return {
      status: false,
      message: 'Extension request rejected by Admin',
      data: updatedSession,
    };
  }
};
