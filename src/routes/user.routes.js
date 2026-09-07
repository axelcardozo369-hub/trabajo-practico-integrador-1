import { Router } from "express";
import {
  agregateUser,
  eliminarUser,
  updateUser,
  verPorIduser,
  verTodayUsers,
} from "../controllers/user.controllers.js";

import { validate } from "../middleware/validate.js";
import {
  deleteUserValidator,
  updateUserValidator,
  UserValidator,
  verPorIdUserValidator,
} from "../middleware/validations/user.validate.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddlware } from "../middleware/admin.middlware.js";

export const userRouter = Router();

userRouter.post("/users", UserValidator, validate, agregateUser);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddlware,
  deleteUserValidator,
  validate,
  eliminarUser,
);
userRouter.get("/users", authMiddleware, verTodayUsers, validate);
userRouter.get(
  "/users/:id",
  authMiddleware,
  verPorIdUserValidator,
  validate,
  verPorIduser,
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  updateUserValidator,
  validate,
  adminMiddlware,
  updateUser,
);
