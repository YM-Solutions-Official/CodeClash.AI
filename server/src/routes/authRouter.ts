import { Router } from "express";
import { signUpValidation } from "../validators/auth/signUpValidator";
import { signUp } from "../controllers/auth/signUp";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { loginValidation } from "../validators/auth/loginValidator";

export const authRouter = Router();

//auth routes
authRouter.post("/sign-up", signUpValidation, signUp);
authRouter.post("/login", loginValidation, login);
authRouter.post("/logout", logout);
