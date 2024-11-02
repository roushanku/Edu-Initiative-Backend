export class CustomError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
export const errorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    status: false,
    message: message || 'Something went wrong'
  });
};

export const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    message,
    data
  });
};