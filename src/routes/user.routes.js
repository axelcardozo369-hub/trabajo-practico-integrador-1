import { Router } from "express";
import { agregateUser, eliminarUser, updateUser, verPorIduser, verTodayUsers } from "../controllers/user.controllers.js";

import {validate} from "../middleware/validate.js"
import { deleteUserValidator, updateUserValidator, UserValidator } from "../middleware/validations/user.validate.js";
export const userRouter = Router();

userRouter.post("/users",UserValidator,validate,agregateUser);
userRouter.delete("/users/:id",deleteUserValidator,validate,eliminarUser);
userRouter.get("/users",verTodayUsers,validate);
userRouter.get("/users/:id",verPorIduser,validate);
userRouter.put("/users/:id",updateUserValidator,validate,updateUser);