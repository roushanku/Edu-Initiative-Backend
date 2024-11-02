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

// router.post('/create', authorize(['user']), paymentController.createPayment);
// router.get('/list', authorize(['user', 'admin']), paymentController.listPayments);
// router.get('/:id', authorize(['user', 'admin']), paymentController.getPaymentById);
// router.post('/:id/refund', authorize(['admin']), paymentController.refundPayment);
// router.get('/user/:userId', authorize(['user', 'admin']), paymentController.getUserPayments);
// router.post('/:id/verify', authorize(['admin']), paymentController.verifyPayment);
// router.get('/session/:sessionId', authorize(['user', 'admin']), paymentController.getSessionPayments);

paymentRouter.post( "/create", authorize(['User']), validate(paymentValidator.createPayment), paymentController.createPayment );
paymentRouter.get("/list", authorize(['User', 'Admin']), paymentController.listPayments);
paymentRouter.get("/:id", authorize(['User','Admin']), validate(paymentValidator.getPaymentById),  paymentController.getPaymentById);
paymentRouter.post("/:id/refund", authorize(['Admin']), validate(paymentValidator.refundPayment), paymentController.refundPayment);
paymentRouter.get("/user/:userId", authorize(['User']), validate(paymentValidator.getUserPayments), paymentController.getUserPayments);
paymentRouter.post("/:id/verify", authorize(['User']), validate(paymentValidator.verifyPayment), paymentController.verifyPayment);
paymentRouter.get("/session/:sessionId", authorize(['User']), validate(paymentValidator.getSessionPayments), paymentController.getSessionPayments);

export default paymentRouter;
