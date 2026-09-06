import { matchedData, validationResult } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";

export const agregarArticle = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const article = await ArticleModel.create(validationData);
    return res
      .status(200)
      .json({ message: "article agregado con exito", article });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al agregar ver articles", error: error.message });
  }
};
export const updateArticle = async (req, res) => {
  try {
    const validationResultBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const articleExiste = await ArticleModel.findByPk(id);

    await articleExiste.update(validationResultBody);
    return res
      .status(200)
      .json({ message: "article actualizado", articleExiste });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al actualizar  articles", error: error.message });
  }
};
export const todayArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          attributes: ["name"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "estos son todos los articles", articles });
  } catch (error) {
    return res.status(500).json({
      message: "error al poder ver todo los article",
      error: error.message,
    });
  }
};
export const verPorIdArticles = async (req, res) => {
  try {
    const idArticle = await ArticleModel.findByPk(req.params.id, {
      include: {
        model: UserModel,
        as: "user",
        attributes: ["username", "email", "role"],
      },
    });
    return res
      .status(200)
      .json({ message: "este es el article que buscaste", idArticle });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al poder ver el article", error: error.message });
  }
};
export const deleteArticles = async (req, res) => {
  try {
    const { id } = req.params;
    const articleExiste = await ArticleModel.findByPk(id);

    await articleExiste.destroy();
    return res
      .status(200)
      .json({ message: "article eliminado correctamente", articleExiste });
  } catch (error) {
    return res.status(500).json({
      message: "error al poder eliimar article",
      error: error.message,
    });
  }
};
