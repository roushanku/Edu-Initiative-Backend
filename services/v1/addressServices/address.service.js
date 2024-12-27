import Address from '../../../models/address.model.js'; // Import your Address model

export const createAddress = async (user, data) => {
  const userId = user.id;
  data.userId = userId;
  data.isDefault = false;
  const address = await Address.create(data);
  return { status: true, message: 'Address created successfully', data: address };
};

export const findAllAddresses = async () => {
  const address = await Address.find();
  return { status: true, message: 'All addresses', count: address.length, data: address };
};

export const getAddressByUser = async (userId) => {
  const address = await Address.find({ userId });
  console.log(address);
  if (!address) {
    return { status: false, message: 'Address not found' };
  }
  return { status: true, message: 'Address found', data: address };
};

export const findAddressById = async (id) => {
  const address = await Address.findById(id);
  // console.log(address);
  if (!address) {
    return { status: false, message: 'Address not found' };
  }
  return { status: true, message: 'Address found', data: address };
};

export const updateAddressById = async (id, data) => {
  const updatedAddress = await Address.findByIdAndUpdate(id, data, { new: true });
  if (!updatedAddress) {
    return { status: false, message: 'Address not found' };
  }
  return { status: true, message: 'Address updated successfully', data: updatedAddress };
};

export const deleteAddressById = async (id) => {
  const address = await Address.findByIdAndDelete(id);
  if (!address) {
    return { status: false, message: 'Address not found' };
  }
  return { status: true, message: 'Address deleted successfully' };
};

export const markAsDefault = async (id, userId) => {
  const address = await Address.findByIdAndUpdate(id, { isDefault: true });
  if (!address) {
    return { status: false, message: 'Address not found' };
  }
  await Address.updateMany({ userId, _id: { $ne: id } }, { isDefault: false });
  return { status: true, message: 'Address updated successfully' };
};
