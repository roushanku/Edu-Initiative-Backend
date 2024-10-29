import express from "express";
import authRoute from "./authRoutes/auth.route.js";
import userRoute from "./userRoutes/user.route.js";
import studentRoute from "./studentRoutes/student.route.js";
import subjectRoute from "./subjectRoutes/subjectRoute.js";
import tutorRoute from "./tutorRoutes/tutor.route.js";
import sessionRoute from "./sessionRoutes/sessionRoutes.js";
const rootRouter = express.Router();

const defaultRoutes = [
  {
    path: "/auth", // use for creating user, login, logout
    route: authRoute,
  },
  {
    path: "/user", // use for getting user info
    route: userRoute,
  },
  {
    path: "/student", // use for creating student, getting student info
    route: studentRoute,
  },
  {
    path: "/tutor", // use for creating tutor, getting tutor
    route: tutorRoute,
  },
  {
    path: "/subject", // use for creating subject, getting subject
    route: subjectRoute,
  },
  {
    path: "/session", // use for creating session, getting session
    route: sessionRoute,
  },
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
