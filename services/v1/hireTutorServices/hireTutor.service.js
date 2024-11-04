import HireTutor from '../../../models/hireTutor.model.js';

export const createRequest = async (requestData) => {
  // Validate time slots don't overlap with existing ones
  const validateTime = await validateTimeSlots(requestData);
  if (!validateTime.status) {
    return validateTime;
  }
  const request = await HireTutor.create(requestData);
  return { status: true, message: 'Request created successfully', data: request };
};

export const getAllRequests = async ({ page = 1, limit = 10, status, modeOfStudy }) => {
  const query = {};
  if (status) query.status = status;
  if (modeOfStudy) query.modeOfStudy = modeOfStudy;
  const requests = await HireTutor.find(query)
    .populate('studentId', 'name email')
    .populate('tutorId', 'name email')
    .populate('subjectId', 'name')
    .populate('addressId')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await HireTutor.countDocuments(query);
  return {
    status: true,
    message: 'Requests fetched successfully',
    data: {
      requests,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    },
  };
};

export const getRequestById = async (id) => {
  const request = await HireTutor.findById(id).populate('studentId', 'name email').populate('tutorId', 'name email').populate('subjectId', 'name').populate('addressID');

  if (!request) {
    return { status: false, message: 'Request not found' };
  }

  return { status: true, message: 'Request fetched successfully', data: request };
};

export const updateRequest = async (id, updateData) => {
  if (updateData.days) {
    const validateTime = await validateTimeSlots(updateData, id);
    if (!validateTime.status) {
      return validateTime;
    }
  }

  const request = await HireTutor.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

  if (!request) {
    return { status: false, message: 'Request not found' };
  }

  return { status: true, message: 'Request updated successfully', data: request };
};

export const deleteRequest = async (id) => {
  const request = await HireTutor.findByIdAndDelete(id);
  if (!request) {
    return { status: false, message: 'Request not found' };
  }
  return { status: true, message: 'Request deleted successfully' };
};

export const getRequestsByStudent = async (studentId) => {
  const requests = await HireTutor.find({ studentId }).populate('tutorId', 'name email').populate('subjectId', 'name').sort({ createdAt: -1 });
  return { status: true, message: 'Requests fetched successfully', data: requests };
};

export const getRequestsByTutor = async (tutorId) => {
  const requests = await HireTutor.find({ tutorId }).populate('studentId', 'name email').populate('subjectId', 'name').sort({ createdAt: -1 });
  return { status: true, message: 'Requests fetched successfully', data: requests };
};

export const respondToRequest = async (id, status) => {
  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    return { status: false, message: 'Invalid status' };
  }

  const request = await HireTutor.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

  if (!request) {
    return { status: false, message: 'Request not found' };
  }

  return { status: true, message: 'Request updated successfully', data: request };
};

const validateTimeSlots = async (requestData, excludeId = null) => {
  const { tutorId, days, startDate, endDate } = requestData;

  // Check for overlapping schedules
  for (const day of days) {
    const overlappingRequest = await HireTutor.findOne({
      tutorId,
      _id: { $ne: excludeId },
      status: { $in: ['PENDING', 'ACCEPTED'] },
      'days.day': day.day,
      $or: [
        {
          'days.startTime': { $lt: day.endTime },
          'days.endTime': { $gt: day.startTime },
        },
      ],
      startDate: { $lte: endDate || startDate },
      $or: [{ endDate: null }, { endDate: { $gte: startDate } }],
    });

    if (overlappingRequest) {
      return { status: false, message: `Tutor is not available on ${day.day}` };
    }
    return { status: true };
  }
};
