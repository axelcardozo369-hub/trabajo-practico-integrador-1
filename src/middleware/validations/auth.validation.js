import { body, param, validationResult } from "express-validator";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("el email no debe ser vacio, es obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email no tiene un formato valido"),
  body("password")
    .notEmpty()
    .withMessage("el password no debe ser vacio, es obligatorio")
    .bail(),
];
export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("el username no debe ser vacio")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("el email no debe ser vacio")
    .bail()
    .isEmail()
    .withMessage("el email no tiene un formato valido"),
  body("password")
    .notEmpty()
    .withMessage("el password no debe ser vacia")
    .bail(),
];
