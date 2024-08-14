import { Router } from "express";
import UserRoutes from "./user";
import AuthRoutes from "./auth";
import LocationRoutes from "./location";
import ReviewRoutes from "./review";
import FeatureRoutes from "./feature";
const router = Router();

export default (): Router => {
  UserRoutes (router);
  AuthRoutes (router);
  LocationRoutes (router);
  ReviewRoutes (router);
  FeatureRoutes (router);

  return router;
};
