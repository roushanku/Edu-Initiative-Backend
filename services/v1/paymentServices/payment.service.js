import Payment from '../../../models/payment.model.js';
import mongoose from 'mongoose';

export const createPayment = async (paymentData) => {
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
    payments,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  };
};

export const getPaymentById = async (paymentId) => {
  return Payment.findById(paymentId)
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email');
};

export const refundPayment = async (paymentId, reason) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) return null;
  if (payment.status !== 'Completed') {
    return null
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
    return payment;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getUserPayments = async (userId) => {
  return Payment.find({
    $or: [{ transferFrom: userId }, { transferTo: userId }]
  })
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email')
    .sort({ createdAt: -1 });
};

export const verifyPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) return null;
  if (payment.status !== 'Pending') {
    return null;
  }

  // Here you would verify with payment gateway
  // const verified = await verifyWithGateway(payment);

  payment.status = 'Completed'; // or 'Failed' based on verification
  payment.updatedAt = new Date();
  await payment.save();

  return payment;
};

export const getSessionPayments = async (sessionId) => {
  return Payment.find({ sessionId })
    .populate('transferFrom', 'name email')
    .populate('transferTo', 'name email')
    .sort({ createdAt: -1 });
};

// Utility function to generate transaction ID
const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
};