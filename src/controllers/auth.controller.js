import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword } from "../helpers/bcript.helper.js";
import { generarToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  const { username, password } = matchedData(req, { locations: ["body"] });

  try {
    const userExiste = await UserModel.findOne({ where: { username } });
    if (!userExiste) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }

    const validarPassowrd = await comparePassword(
      password,
      userExiste.password,
    );
    if (!validarPassowrd) {
      return res
        .status(401)
        .json({ message: "credenciales fueron incorrectas" });
    }

    const token = generarToken({ userId: userExiste.id });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .status(200)
      .json({ message: "login exitoso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error interno del servidor", error: error.message });
  }
};
