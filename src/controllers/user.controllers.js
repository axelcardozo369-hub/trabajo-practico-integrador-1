import { matchedData, param, validationResult } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
export const agregateUser = async (req,res) => {
    try {
        const validationData = matchedData(req);
        const user = await UserModel.create(validationData)
        console.log(validationData)
        return res.status(201).json({message:"user agregado"},user)
    } catch (error) {
        return res.status(500).json({message:'Error al poder agregar users',error:error.message})
    }
}
export const eliminarUser = async (req,res) => {
    try {
        const {id} = req.params;
        const userExiste = await UserModel.findByPk(id);
        if (!userExiste) {
            return res.status(404).json({message:"el user no fue encontrado"})
        }
        await userExiste.destroy();
        return res.status(200).json({message:"user eliminado",userExiste})
    } catch (error) {
        return res.status(500).json({message:"error al poder eliminar user",error:error.message})
    }
}
export const verTodayUsers = async (req,res) => {
    try {
        const user = await UserModel.findAll({
            include:{model:ProfileModel, as:"profile",attributes:["first_name","last_name","biography","avatar_url"]}
        })
        return res.status(200).json({message:"estos son todos los users",user})
    } catch (error) {
        return res.status(500).json({message:"Error al poder ver todos los  user"})
    }
}
export const verPorIduser = async (req,res) => {
    try {
        const idUser = await UserModel.findByPk(req.params.id,{include:{model:ProfileModel, as:"profile",attributes:["first_name","last_name","biography","avatar_url"]}})
        if (!idUser) {
            return res.status(404).json({message:"el user buscado no existe"})
        }
        return res.status(200).json({message:"este es el user que buscaste",idUser})
        console.log(idUser)
    } catch (error) {
        return res.status(500).json({message:"Error al poder ver al user",error:error.message})
    }
}
export const updateUser = async (req,res) => {
    try {
        const validationResultBody = matchedData(req,{locations:["body"]})
        const {id} = matchedData(req,{locations:["params"]})
        const userExiste = await UserModel.findByPk(id);
        if (!userExiste) {
            return res.status(404).json({message:"no se encontro el user"})
        }
        await userExiste.update(validationResultBody)
        return res.status(201).json({message:"user editado",userExiste})
    } catch (error) {
        return res.status(500).json({message:"error al poder editar user",error:error.message})
    }
}