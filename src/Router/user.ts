import { Router } from "express";
import { JWTAuthMiddleWare } from "../utils/auth";
import {
  handleGetUsers,
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleUpdateUserPassword,
  handleDeleteUser,
} from "../Controllers/user";


export default (router: Router) => {
  const userPrefix = "/users";

  router.get(`${userPrefix}`, JWTAuthMiddleWare, handleGetUsers);

  router.get(`${userPrefix}/:id`, JWTAuthMiddleWare, handleGetUser);

  router.post(`${userPrefix}`, JWTAuthMiddleWare, handleCreateUser);

  router.put(`${userPrefix}/:id`, JWTAuthMiddleWare, handleUpdateUser);

  router.put(`${userPrefix}/:id/password`, JWTAuthMiddleWare, handleUpdateUserPassword);

  router.delete(`${userPrefix}/:id`, JWTAuthMiddleWare, handleDeleteUser);
};
