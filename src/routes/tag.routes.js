import { Router } from "express";
import { agregarTag } from "../controllers/tag.controllers";
import { validate } from "../middleware/validate";

export const tagRouter = Router();
tagRouter.post("/tag", validate, agregarTag);
