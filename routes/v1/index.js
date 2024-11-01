import express from "express";
import userRoute from "./userRoutes/user.route.js";
import studentRoute from "./studentRoutes/student.route.js";
import tutorRoute from "./tutorRoutes/tutor.route.js";
import subjectRoute from "./subjectRoutes/subjectRoute.js";
import addressRoute from "./addressRoutes/address.route.js";
import authRoute from "./authRoutes/auth.route.js";
import sessionRoute from "./sessionRoutes/sessionRoutes.js";
import notificationRoute from "./notificationRoutes/notificationRoutes.js";
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
    path: "/address", // use for creating tutor, getting tutor
    route: addressRoute,
  },
  {
    path: "/session", // use for creating session, getting session
    route: sessionRoute,
  },
  {
    path : "/notification", // use for creating notification, getting notification
    route : notificationRoute,
  },
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
