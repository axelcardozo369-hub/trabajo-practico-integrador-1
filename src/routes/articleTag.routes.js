import { Router } from "express";
import {
  agregarArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controllers.js";
import { validate } from "../middleware/validate.js";
import {
  agregarArticleTagValidator,
  deleteArticleTagValidator,
} from "../middleware/validations/articleTag.validation.js";
export const articleTagRouter = Router();

articleTagRouter.post(
  "/articleTag",
  agregarArticleTagValidator,
  validate,
  agregarArticleTag,
);
articleTagRouter.delete(
  "/articleTag/:id",
  deleteArticleTagValidator,
  validate,
  deleteArticleTag,
);
