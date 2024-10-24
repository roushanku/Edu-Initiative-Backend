import express from "express";
import authRoute from "./authRoutes/auth.route.js";
import subjectRoute from "./subjectRoutes/subjectRoute.js";

const rootRouter = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/subject",
    route: subjectRoute,
  },
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
