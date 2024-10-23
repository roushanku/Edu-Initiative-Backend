import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user" , userRouter);


export default rootRouter;
