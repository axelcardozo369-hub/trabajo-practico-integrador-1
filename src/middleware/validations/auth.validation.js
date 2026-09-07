import { body, param, validationResult } from "express-validator";

export const loginValidation = [
  body("username")
    .notEmpty()
    .withMessage("el username no debe ser vacio, es obligatorio")
    .bail(),
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
    .isEmail()
    .notEmpty()
    .withMessage("el email no debe ser vacio")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("el password no debe ser vacia")
    .bail(),
];
