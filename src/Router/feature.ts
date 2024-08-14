import { Router } from "express";
import { JWTAuthMiddleWare } from "../utils/auth";
import {
  handleCreateFeature,
  handleGetFeatures,
  handleGetFeature,
  handleUpdateFeature,
  handleDeleteFeature,
} from "../Controllers/feature";

export default (router: Router) => {
  const featurePrefix = "/features";
  
  router.post(`${featurePrefix}`, handleCreateFeature);
  router.get(`${featurePrefix}`, handleGetFeatures);
  router.get(`${featurePrefix}/:id`, handleGetFeature);
  router.put(`${featurePrefix}/:id`, handleUpdateFeature);
  router.delete(`${featurePrefix}/:id`, handleDeleteFeature);
};
