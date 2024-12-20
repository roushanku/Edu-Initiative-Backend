import mongoose from 'mongoose';

// Address Schema
const addressSchema = {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  type: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
  label: String,
  town: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  zipCode: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  additionalInfo: String,
  isDefault: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
};

const Addresses = mongoose.model('Addresses', addressSchema);

export default Addresses;
