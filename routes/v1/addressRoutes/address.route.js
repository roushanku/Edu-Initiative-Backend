import express from "express";
import * as addressController from "../../../controllers/v1/addressController/address.controller.js";
import validate from "../../../middleware/validate.js";
import * as addressValidation from "../../../validations/address.validation.js";
const addressRouter = express.Router();

addressRouter.post("/", validate(addressValidation.addAddress), addressController.addAddress);
addressRouter.get("/", addressController.getAllAddresses);
addressRouter.get("/:id", validate(addressValidation.getAddressById), addressController.getAddressById);
addressRouter.put("/:id",validate(addressValidation.updateAddress),  addressController.updateAddress);
addressRouter.delete("/:id", validate(addressValidation.deleteAddress), addressController.deleteAddress);
addressRouter.patch("/:id/default", validate(addressValidation.setDefaultAddress), addressController.setDefaultAddress);

export default addressRouter;