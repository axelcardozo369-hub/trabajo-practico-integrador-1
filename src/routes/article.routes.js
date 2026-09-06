import { Router } from "express";
import {
  agregarArticle,
  deleteArticles,
  todayArticles,
  updateArticle,
  verPorIdArticles,
} from "../controllers/article.controllers.js";
import { validate } from "../middleware/validate.js";
import {
  agregarArticleValidator,
  deleteArticleValidator,
  updateArticleValidator,
  verPorIdArticleValidator,
} from "../middleware/validations/article.validation.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  agregarArticleValidator,
  validate,
  agregarArticle,
);
articleRouter.get("/articles", validate, todayArticles);
articleRouter.get(
  "/articles/:id",
  verPorIdArticleValidator,
  validate,
  verPorIdArticles,
);
articleRouter.put(
  "/articles/:id",
  updateArticleValidator,
  validate,
  updateArticle,
);
articleRouter.delete(
  "/articles/:id",
  deleteArticleValidator,
  validate,
  deleteArticles,
);
