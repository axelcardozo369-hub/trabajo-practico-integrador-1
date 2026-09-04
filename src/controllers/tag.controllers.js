import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";

export const agregarTag = async (req, res) => {
  try {
    const validationData = matchedData(req);
    const tag = await TagModel.create(validationData);
    return res.status(201).json({ message: "tag agregado" }, tag);
  } catch (error) {
    return res.status(500).json({ message: "error al agregar tag" });
  }
};
export const updateTag = async (req, res) => {
  try {
    const validationResultBody = matchedData(req,{locations:["body"]})
    const {id} = matchedData(req,{locations:["params"]})
    const tagExiste = await TagModel.findByPk(id);

    await tagExiste.update(validationResultBody)
    return res.status(200).json({message:"tag editado con exito"},tagExiste)
  } catch (error) {
    return res.status(500).json({ message: "error al poder editar tag" });
  }
};
export const deleteTag = async (req, res) => {
  try {
     const {id} = req.params;
            const TagExiste = await TagModel.findByPk(id);
    await TagExiste.destroy()
    return res.status(200).json({message:"tag eliminada"})
  } catch (error) {
    return res.status(500).json({ message: "error al poder eliminar tag",error:error.message });
  }
};
export const todayTags = async (req,res) => {
  try {
    const tag = await TagModel.findAll()

    return res.status(200).json({message:"estos son todas las tags"})
  } catch (error) {
    return res.status(500).json({message:"error al ver todas las tags",error:error.message})
  }
}
export const  verPorIdTag = async (req,res) => {
  try {
    const idTag = await TagModel.findByPk(req.params.id)
    return res.status(201).json({message:"tag encontrada con exito"},idTag)
  } catch (error) {
    return res.status(500).json({message:"error a poder ver el id de tag",error:error.message})
  }
}
