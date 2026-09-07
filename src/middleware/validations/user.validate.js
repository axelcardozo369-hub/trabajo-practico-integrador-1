import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const UserValidator = [
  body("username")
    .notEmpty()
    .withMessage("el username no debe ser vacio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("deber al menos 20 o 3 caracteres ")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("el email no puede ser vacio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido")
    .bail()
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ where: { email } });
      if (emailExiste) {
        throw new Error("este email ya se encuentra registrado");
      }
      return true;
    })
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("el password no debe ser vacia")
    .bail(),
  body("role")
    .optional()
    .isLength(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'")
    .bail(),
];
export const deleteUserValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await UserModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el user no existe en la base de datos ");
      }
      return true;
    }),
];
export const updateUserValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await UserModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el user no existe en la base de datos");
      }
      return true;
    })
    .bail(),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("el username no debe ser vacio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("deber al menos 20 o 3 caracteres ")
    .bail(),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("el email no puede ser vacio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido")
    .bail()
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ where: { email } });
      if (!emailExiste) {
        throw new Error("el email que quiere registrar ya existe");
      }
      return true;
    })
    .bail(),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("el password no debe ser vacio")
    .bail(),
  body("role")
    .optional()
    .notEmpty()
    .withMessage("el rol no puede ser vacio")
    .bail()
    .isLength(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'")
    .bail(),
];
export const verPorIdUserValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe ser un numero positivo")
    .bail()
    .custom(async (id) => {
      const idExiste = await UserModel.findByPk(id);
      if (!idExiste) {
        throw new Error("el user que buscaste no esta en la base de datos");
      }
      return true;
    }),
];
