import mongoose from "mongoose";

// Address Schema
const addressSchema = {
  type: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
  label: String, // Custom label for the address (e.g., "John's House", "Library")
  town: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: "India" },
  zipCode: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  additionalInfo: String, // Landmarks, building name, floor, etc.
  isDefault: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
};

const Address = mongoose.model("Address", addressSchema);

export default Address;
