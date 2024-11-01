import { addressService } from "../../../services/index.js";

export const addAddress = async (req, res) => {
  try {
    const response = await addressService.createAddress(req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getAllAddresses = async (req, res) => {
  try {
    const response = await addressService.findAllAddresses();
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const response = await addressService.findAddressById(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const response = await addressService.updateAddressById(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const response = await addressService.deleteAddressById(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const response = await addressService.markAsDefault(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
