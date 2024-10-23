import { Router } from "express";

import { createUserController } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/createuser", createUserController);

export default userRouter;