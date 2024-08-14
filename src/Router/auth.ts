import { Router } from "express";
import { handleRegisterUser, handleUserLogin } from "../Controllers/auth";

export default (router: Router) => {
    router.post("/register", handleRegisterUser);
    router.post("/login", handleUserLogin);  
};
