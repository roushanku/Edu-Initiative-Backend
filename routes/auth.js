import { Router } from "express";
import {signupController, loginController} from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/signup", signupController);
authRouter.get("/login", loginController);

export default authRouter;