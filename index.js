import express from "express";
import logger from "./logger.js";
import { PORT } from "./scerets.js";
import connectMongoDb from "./db/mongoose.js";
import rootRouter from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", rootRouter);


// Connect to MongoDB
connectMongoDb();

app.post("/", (req, res) => {
  // console.log(req.body);
  res.json({
    status: true,
    message: "API is running",
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
