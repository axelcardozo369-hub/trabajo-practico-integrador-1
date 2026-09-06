import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { loginValidation } from "../middleware/validations/auth.validation.js";
import { validate } from "../middleware/validate.js";

export const authRouter = Router();
authRouter.post("/auth/login", loginValidation, validate, login);
