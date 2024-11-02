import express from "express";
import {
  authenticate,
  authorize,
} from "../../../middleware/auth.middleware.js";
import * as paymentController from "../../../controllers/v1/paymentController/payment.controller.js";
import * as paymentValidator from "../../../validations/payment.validation.js";
import validate from "../../../middleware/validate.js";
const paymentRouter = express.Router();

paymentRouter.use(authenticate); // Protect all payment routes
paymentRouter.post( "/create", authorize(['User','Admin', 'Tutor', 'Student']), validate(paymentValidator.createPayment), paymentController.createPayment );
paymentRouter.get("/list", authorize(['User', 'Admin']), paymentController.listPayments);
paymentRouter.get("/:id", authorize(['User','Admin']), validate(paymentValidator.getPaymentById),  paymentController.getPaymentById);
paymentRouter.post("/:id/refund", authorize(['Admin']), validate(paymentValidator.refundPayment), paymentController.refundPayment);
paymentRouter.get("/user/:userId", authorize(['User', 'Admin']), validate(paymentValidator.getUserPayments), paymentController.getUserPayments);
paymentRouter.post("/:id/verify", authorize(['Admin']), validate(paymentValidator.verifyPayment), paymentController.verifyPayment);
paymentRouter.get("/session/:sessionId", authorize(['User', 'Admin']), validate(paymentValidator.getSessionPayments), paymentController.getSessionPayments);

export default paymentRouter;
