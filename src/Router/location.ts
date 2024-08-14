import { Router } from "express";
import { JWTAuthMiddleWare } from "../utils/auth";
import {
  handleCreateLocation,
  handleGetLocations,
  handleGetLocation,
  handleUpdateLocation,
  handleDeleteLocation,
} from "../Controllers/location";

export default (router: Router) => {
  const locationPrefix = "/locations";
    
  router.post(`${locationPrefix}`, JWTAuthMiddleWare, handleCreateLocation);
  router.get(`${locationPrefix}`, JWTAuthMiddleWare, handleGetLocations);
  router.get(`${locationPrefix}/:id`, JWTAuthMiddleWare, handleGetLocation);
  router.put(`${locationPrefix}/:id`, JWTAuthMiddleWare, handleUpdateLocation);
  router.delete(`${locationPrefix}/:id`, JWTAuthMiddleWare, handleDeleteLocation);
};
