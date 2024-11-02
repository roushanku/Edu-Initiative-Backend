import * as paymentService from '../../../services/v1/paymentServices/payment.service.js';
import { errorResponse, successResponse } from '../../../utils/responseHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment({
    ...req.body,
    transferFrom: req.user._id
  });
  if(!payment) return errorResponse(res,'Payment failed', 400);
  return successResponse(res, payment, 'Payment successful', 201);
});

export const listPayments = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, startDate, endDate } = req.query;
  const payments = await paymentService.listPayments({
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    startDate,
    endDate
  });
  return successResponse(res, payments, 'Payments retrieved', 200);
});

export const getPaymentById = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  if(!payment) return errorResponse(res,'Payment not found', 404);
  return successResponse(res, payment, 'Payment retrieved', 200);
});

export const refundPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.refundPayment(req.params.id, req.body.reason);
  if(!payment) return errorResponse(res,'Payment refund failed', 400);
  return successResponse(res, payment, 'Payment refunded', 200);
});

export const getUserPayments = catchAsync(async (req, res) => {
  const payments = await paymentService.getUserPayments(req.params.userId);
  if(!payments) return errorResponse(res,'No payments found for this user', 404);
  return successResponse(res, payments, 'Payments retrieved', 200);
});

export const verifyPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.verifyPayment(req.params.id);
  if(!payment) return errorResponse(res,'Payment verification failed', 400);
  return successResponse(res, payment, 'Payment verified', 200);
});

export const getSessionPayments = catchAsync(async (req, res) => {
  const payments = await paymentService.getSessionPayments(req.params.sessionId);
  if(!payments) return errorResponse(res,'No payments found for this session', 404);
  return successResponse(res, payments, 'Payments retrieved', 200);
});