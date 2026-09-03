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
  } catch (error) {
    return res.status(500).json({ message: "error al poder editar tag" });
  }
};
export const deleteTag = async (res, req) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "error al poder eliminar tag" });
  }
};
