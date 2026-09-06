import { body, param } from "express-validator";
import { ArticleTagModel } from "../../models/articleTag.model.js";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";
export const agregarArticleTagValidator = [
  body("article_id")
    .notEmpty()
    .withMessage("el article_id no debe ser vacio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("el id de article deber ser un numero positivo")
    .bail()
    .custom(async (article_id) => {
      const articleExiste = await ArticleModel.findByPk(article_id);
      if (!articleExiste) {
        throw new Error("el articulo no existe todavia");
      }
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id no puede estar vacío")
    .bail()
    .isInt({ min: 1 })
    .withMessage("El tag_id debe ser un número entero positivo")
    .bail()
    .custom(async (tag_id) => {
      const tagExiste = await TagModel.findByPk(tag_id);
      if (!tagExiste) {
        throw new Error("la etiqueta no existe en la base de datos");
      }
      return true;
    }),
];
export const deleteArticleTagValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (articleTagId) => {
      const relacionExiste = await ArticleModel.findByPk(articleTagId);
      if (!relacionExiste) {
        throw new Error("la relacion entre article y tag no existe ");
      }
      return true;
    }),
];
