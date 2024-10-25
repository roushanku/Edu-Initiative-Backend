import express from "express";
import authRoute from "./authRoutes/auth.route.js";

const rootRouter = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
