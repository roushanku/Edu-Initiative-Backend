import express from "express";
import logger from "./logger.js";
import { PORT } from "./scerets.js";
import connectMongoDb from "./db/mongoose.js";

const app = express();

// Connect to MongoDB
connectMongoDb();

app.use("/", (req, res) => {
  res.json({
    status: true,
    message: "API is running",
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
