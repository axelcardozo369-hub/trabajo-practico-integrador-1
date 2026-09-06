import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";
export const agregarArticleValidator = [
  body("title").notEmpty().withMessage("el title no debe ser vacio").bail(),
  body("content").notEmpty().withMessage("el content no debe ser vacio").bail(),
  body("excerpt").notEmpty().withMessage("el excerpt no debe ser vacio").bail(),
  body("status")
    .notEmpty()
    .withMessage("el status no debe ser vacio")
    .isIn(["published", "archived"])
    .withMessage("el status debe ser si o si al menos published o archived"),
  body("user_id")
    .isInt({ min: 1 })
    .withMessage("el id del usuario deber ser un numero positivo")
    .bail()
    .custom(async (user_id) => {
      const userId = await UserModel.findByPk(user_id);
      if (!userId) {
        throw new Error("el usuario no esta registrado todavia");
      }
      return true;
    }),
];
export const deleteArticleValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await ArticleModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el article no existe ");
      }
      return true;
    }),
];
export const updateArticleValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positvo")
    .bail()
    .custom(async (id) => {
      const idExiste = await ArticleModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el article no existe todavia en la base de datos");
      }
      return true;
    })
    .bail(),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("el title no debe estar vacio")
    .bail(),
  body("content").notEmpty().withMessage("el content no debe ser vacio").bail(),
  body("excerpt").notEmpty().withMessage("el excerpt no debe ser vacio").bail(),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("el status no debe ser vacio")
    .isIn(["published", "archived"])
    .withMessage("el status debe ser si o si al menos published o archived"),
];
export const verPorIdArticleValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await ArticleModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el article no esta registrado");
      }
      return true;
    }),
];
