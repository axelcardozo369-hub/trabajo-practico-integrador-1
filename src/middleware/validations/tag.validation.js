import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const agregarTagValidator = [
    body("name").notEmpty().withMessage("el name no puede estar vacia").bail().isString().withMessage("el name debe ser un texto").bail().isLength({min:2, max:30}).withMessage("el name deber al menos hasta 30 caracteres").bail().custom(async (name) => {
        const tagExiste = await TagModel.findOne({where:{name}});
        if (tagExiste) {
            throw new Error("el name ya se encuentra registrado");
            
        }
        return true;
    })
];
export const deleteTagValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail().custom(async (id) => {
        const idExiste = await TagModel.findByPk(id)
        if (!idExiste) {
            throw new Error("el id de la tag no se encuentra");
            
        }
        return true;
    })
];
export const updateTagValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail().custom(async (id) => {
        const idExiste = await TagModel.findByPk(id);
        if (!idExiste) {
            throw new Error("el tag no se encuentra");
            
        }
        return true;
    }),
    body("name").notEmpty().withMessage("el name no puede quedar vacio").bail().isLength({min:3,max:30}).withMessage("el name debe almenos tener hasta 30 caracteres").bail()
  //  .custom(async (name) => {
     //   const tagExiste = await TagModel.findOne({where:{name}});
       // if (!tagExiste) {
         //   throw new Error("el name de la etiqueta ya se encuentra registrado");
            
        //}
        //return true;
    //})
    
];
export const verPorIdTagValidator = [
    param("id").isInt({min:1}).withMessage("el id debe ser un numero positivo").bail().custom(async (id) => {
        const idExiste = await TagModel.findByPk(id);
        if (!idExiste) {
            throw new Error("no se encontro el tag,no debe existir");
            
        }
        return true;
    })
];
