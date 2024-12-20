import express from 'express';
import validate from '../../../middleware/validate.js';
import * as addressValidation from '../../../validations/address.validation.js';
import * as addressController from '../../../controllers/v1/addressController/address.controller.js';
import { authenticate, authorize } from '../../../middleware/auth.middleware.js';
const addressRouter = express.Router();

addressRouter.post('/', authenticate, authorize(['Admin', 'Student', 'Tutor']), validate(addressValidation.addAddress), addressController.addAddress);
addressRouter.get('/', authenticate, authorize(['Admin']), addressController.getAllAddresses);
addressRouter.get('/user', authenticate, authorize(['Admin', 'Student', 'Tutor']), addressController.getAddressByUser);
addressRouter.get('/:id', authenticate, authorize(['Admin', 'Student', 'Tutor']), validate(addressValidation.getAddressById), addressController.getAddressById);
addressRouter.put('/:id', authenticate, authorize(['Admin', 'Student', 'Tutor']), validate(addressValidation.updateAddress), addressController.updateAddress);
addressRouter.delete('/:id', authenticate, authorize(['Admin', 'Student', 'Tutor']), validate(addressValidation.deleteAddress), addressController.deleteAddress);
addressRouter.patch('/:id/default', authenticate, authorize(['Admin', 'Student', 'Tutor']), validate(addressValidation.setDefaultAddress), addressController.setDefaultAddress);

export default addressRouter;
