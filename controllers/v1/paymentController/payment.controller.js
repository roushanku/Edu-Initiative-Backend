import * as paymentService from "../../../services/v1/paymentServices/payment.service.js";
import {
  errorResponse,
  successResponse,
} from "../../../utils/responseHandler.js";

export const createPayment = async (req, res) => {
  const response = await paymentService.createPayment({
    ...req.body,
    transferFrom: req.user._id,
  });
  res.json(response);
};

export const listPayments = async (req, res) => {
  const { page = 1, limit = 10, status, startDate, endDate } = req.query;
  const response = await paymentService.listPayments({
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    startDate,
    endDate,
  });
  res.json(response);
};

export const getPaymentById = async (req, res) => {
  const response = await paymentService.getPaymentById(req.params.id);
  res.json(response);
};

export const refundPayment = async (req, res) => {
  const response = await paymentService.refundPayment(
    req.params.id,
    req.body.reason
  );
  res.json(response);
};

export const getUserPayments = async (req, res) => {
  const response = await paymentService.getUserPayments(req.params.userId);
  res.json(response);
};

export const verifyPayment = async (req, res) => {
  const response = await paymentService.verifyPayment(req.params.id);
  res.json(response);
};

export const getSessionPayments = async (req, res) => {
  const response = await paymentService.getSessionPayments(
    req.params.sessionId
  );
  res.json(response);
};
