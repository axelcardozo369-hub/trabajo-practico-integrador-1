import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";
export const agregarProfileValidator = [
    body("user_id").notEmpty().withMessage("el id del usuario no debe ser vacio").bail().isInt({min:1}).withMessage("el id del usuario deber ser un numero positivo").bail()
    .custom(async (user_id) => {
        const idUserExiste = await UserModel.findByPk(user_id);
        if (!idUserExiste) {
            throw new Error("el usuario no se encuentra en la base de datos");
            
        }
        const profileExistente = await ProfileModel.findOne({where:{user_id}});
        if (profileExistente) {
            throw new Error("el usuario que quieres registrar ya tiene un perfil");    
        }
        
        return true;
    }).bail(),
    body("first_name").notEmpty().withMessage("el first_name no puede ser vacio").bail(),
    body("last_name").notEmpty().withMessage("el last_name no puede  ser vacio").bail(),
    body("biography").notEmpty().withMessage("la biografia no puede ser vacio").bail(),
    body("avatar_url").notEmpty().withMessage("el url de avatar no puede ser vacio").bail(),
    body("birth_date").notEmpty().withMessage("el birth_date no puede ser vacio")
];
export const deleteProfileValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail().custom(async (id) => {
        const profileExiste = await ProfileModel.findByPk(id);
        if (!profileExiste) {
            throw new Error("el perfil no existe");
            
        }
    })
];
export const updateProfileValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail().custom(async (id) => {
        const profileExiste = await ProfileModel.findByPk(id);
        if (!profileExiste) {
            throw new Error("el profile no se encuentra en la base de datos");
            
        }
        return true;
    }),
    body("user_id").isInt({min:1}).withMessage("e; id del user debe ser un numero positivo").bail().custom(async (user_id) => {
        const existeUserId = await UserModel.findByPk(user_id)
        if (!existeUserId) {
            throw new Error("el user no existe");
            
        }
        return true
    }).bail(),
    body("first_name").optional().notEmpty().withMessage("el first_name no debe ser vacio").bail(),
    body("last_name").optional().notEmpty().withMessage("el last_name no debe ser vacio").bail(),
    body("biography").optional().notEmpty().withMessage("la biografia no debe ser vacia").bail(),
    body("avatar_url").optional().notEmpty().withMessage("el avatar_url no debe estar vacia").bail(),
    body("birth_date").optional().notEmpty().withMessage("el birth_date no debe ser vacia")
];
export const verPorIdProfileValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail()
    .custom(async (id) => {
        const idExiste = await ProfileModel.findByPk(id)
        if (!idExiste) {
            throw new Error("el profile no se encuentra en la base de datos");
            
        }
        return true;
    })
];
