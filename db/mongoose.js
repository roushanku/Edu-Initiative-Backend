import mongoose from "mongoose";
import { MONGO_DATABASE_URL } from "../scerets.js"; // Assuming your MongoDB URI is in secrets.js
import logger from "../logger.js";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(MONGO_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if unable to connect
  }
};

export default connectMongoDb;
