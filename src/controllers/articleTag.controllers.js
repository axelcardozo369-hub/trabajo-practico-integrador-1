import { matchedData, validationResult } from "express-validator";
import { ArticleTagModel } from "../models/articleTag.model.js";

export const agregarArticleTag = async (req, res) => {
  try {
    const validationDataBody = matchedData(req, { locations: ["body"] });
    const articleTag = await ArticleTagModel.create(validationDataBody);
    return res
      .status(201)
      .json({ message: "tag agregada a article con exito", articleTag });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error a poder agregar", error: error.message });
  }
};
export const deleteArticleTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const articleTagExiste = await ArticleTagModel.findByPk(id);
    await articleTagExiste.destroy();
    return res
      .status(200)
      .json({ message: "relacion eliminada correctamente", articleTagExiste });
  } catch (error) {
    return res.status(500).json({
      message: "error al poder borrar la relacion :(",
      error: error.message,
    });
  }
};
