import express from "express";
import authRoute from "./authRoutes/auth.route.js";

const rootRouter = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  // {
  //   path: "/users",
  //   route: userRoute,
  // },
];

defaultRoutes.forEach((route) => {
  rootRouter.use(route.path, route.route);
});

export default rootRouter;
