import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../middleware/validations/auth.validation.js";
import { validate } from "../middleware/validate.js";

export const authRouter = Router();
authRouter.post("/auth/logout", logout);
authRouter.post("/auth/login", loginValidation, validate, login);
authRouter.post("/auth/register", registerValidation, validate, register);
