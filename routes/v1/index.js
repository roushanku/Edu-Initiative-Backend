import express from "express";
import authRoute from "./authRoutes/auth.route.js";
import subjectRoute from "./subjectRoutes/subjectRoute.js";
import tutorRoute from "./tutorRoutes/tutor.route.js";

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
  {
    path: "/tutor",
    route: tutorRoute,
  }
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
