import { matchedData, validationResult } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";

export const agregarProfile = async (req, res) => {
  try {
    const validationData = matchedData(req);
    const profile = await ProfileModel.create(validationData);
    return res.status(201).json({ message: "profile agregado" }, profile);
  } catch (error) {
    return res.status(500).json({
      message: "error al poder agregar profile",
      error: error,
      message,
    });
  }
};
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileExiste = await ProfileModel.findByPk(id);

    await profileExiste.destroy();
    return res
      .status(200)
      .json({ message: "profile borrado con exito", profileExiste });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al eliminar perfil", error: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const validationDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const profileExiste = await ProfileModel.findByPk(id);
    await profileExiste.update(validationDataBody);
    return res
      .status(200)
      .json({ message: "profile editado con exito", profileExiste });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al poder ediar profile", error: error.message });
  }
};
export const verPorIdProfile = async (req, res) => {
  try {
    const idProfile = await ProfileModel.findByPk(req.params.id, {
      include: {
        model: UserModel,
        as: "user",
        attributes: ["username", "email", "role"],
        include: [
          {
            model: ArticleModel,
            as: "Articles",
            attributes: ["title", "content", "excerpt", "status"],
          },
        ],
      },
    });

    return res.status(200).json({ message: "profile con exito", idProfile });
  } catch (error) {
    return res.status(500).json({
      message: "error al ver por id los profile",
      error: error.message,
    });
  }
};
export const todayProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: ["username", "email", "role"],
      },
    });

    return res
      .status(200)
      .json({ message: "estos son todos los perfiles", profiles });
  } catch (error) {
    return res.status(500).json({
      message: "error al poder ver todos los perfiles",
      error: error.message,
    });
  }
};
