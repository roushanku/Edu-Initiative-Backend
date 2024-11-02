import { CustomError } from '../utils/responseHandler.js';

export const validatePayment = (req, res, next) => {
  const { amount, currency, paymentMethod } = req.body;

  if (!amount || !currency || !paymentMethod) {
    throw new CustomError('Missing required payment fields');
  }

  if (typeof amount !== 'number') {
    throw new CustomError('Amount must be a number');
  }

  if (!['INR', 'USD', 'EUR'].includes(currency)) {
    throw new CustomError('Invalid currency');
  }

  if (!['UPI', 'NEFT', 'CHEQUE'].includes(paymentMethod.type)) {
    throw new CustomError('Invalid payment method');
  }

  next();
};