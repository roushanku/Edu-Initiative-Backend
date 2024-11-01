import express from "express";
import logger from "./logger.js";
import { PORT } from "./scerets.js";
import connectMongoDb from "./db/mongoose.js";
import rootRouter from "./routes/v1/index.js";

const app = express();

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use("/v1/api", rootRouter);

// Connect to MongoDB
connectMongoDb();


app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
