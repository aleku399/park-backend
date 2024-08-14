import { Router } from "express";
import { JWTAuthMiddleWare } from "../utils/auth";
import {
  handleCreateReview,
  handleGetReviews,
  handleGetReview,
  handleUpdateReview,
  handleDeleteReview,
} from "../Controllers/review";

export default (router: Router) => {
  const reviewPrefix = "/reviews";
    
  router.post(`${reviewPrefix}`,  handleCreateReview);
  router.get(`${reviewPrefix}`, handleGetReviews);
  router.get(`${reviewPrefix}/:id`, handleGetReview);
  router.put(`${reviewPrefix}/:id`, handleUpdateReview);
  router.delete(`${reviewPrefix}/:id`, handleDeleteReview);
};
