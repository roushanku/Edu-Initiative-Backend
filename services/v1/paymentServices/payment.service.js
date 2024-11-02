import Payment from '../../../models/payment.model.js';
import mongoose from 'mongoose';
import User from '../../../models/user.model.js';

export const createPayment = async (paymentData) => {
  const transferFrom = paymentData.transferFrom;
  const transferTo = paymentData.transferTo;
  const existingUserFrom = await User.findById(transferFrom);
  if(!existingUserFrom) return {status: false, message: 'Transafer from User not found'};
  const existingUserTo = await User.findById(transferTo);
  if(!existingUserTo) return {status: false, message: 'Transafer to User not found'};

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.create([{
      ...paymentData,
      transactionId: generateTransactionId(),
    }], { session });

    // Here you would integrate with actual payment gateway
    // await processPaymentWithGateway(payment);

    await session.commitTransaction();
    return payment[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const listPayments = async ({ page, limit, status, startDate, endDate }) => {
  const query = {};
  if (status) query.status = status;
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const payments = await Payment.find(query)
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Payment.countDocuments(query);

  return {
    status:   true,
    message:  'Payments retrieved',
    data:     {
      payments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    },
  };
};

export const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId)
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email');
    return {
      status: true,
      message: 'Payment retrieved',
      data: payment,
    }
};

export const refundPayment = async (paymentId, reason) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) return { status: false, message: 'Payment not found' };
  if (payment.status !== 'Completed') {
    return {status: false, message: 'Payment not completed'};
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Here you would integrate with payment gateway for refund
    // await processRefundWithGateway(payment);

    payment.status = 'Refunded';
    payment.refundReason = reason;
    payment.updatedAt = new Date();
    await payment.save({ session });

    await session.commitTransaction();
    return {status: true, message: 'Payment refunded', data: payment}; 
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getUserPayments = async (userId) => {
  const payment =  Payment.find({
    $or: [{ transferFrom: userId }, { transferTo: userId }]
  })
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email')
    .sort({ createdAt: -1 });
  return {
    status: true,
    message: 'Payments retrieved',
    data: payment,
  };
};

export const verifyPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) return { status: false, message: 'Payment not found' };
  if (payment.status !== 'Pending') {
    return { status: false, message: 'Payment already verified' };
  }

  // Here you would verify with payment gateway
  // const verified = await verifyWithGateway(payment);

  payment.status = 'Completed'; // or 'Failed' based on verification
  payment.updatedAt = new Date();
  await payment.save();

  return {
    status: true,
    message: 'Payment verified',
    data: payment,
  }
};

export const getSessionPayments = async (sessionId) => {
  const payment =  Payment.find({ sessionId })
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email')
    .sort({ createdAt: -1 });
  return {
    status: true,
    message: 'Payments retrieved',
    data: payment,
  };
};

// Utility function to generate transaction ID
const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
};