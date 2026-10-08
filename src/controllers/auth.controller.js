import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcript.helper.js";
import { generarToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  const { email, password } = matchedData(req, {
    locations: ["body"],
  });

  try {
    const userExiste = await UserModel.findOne({ where: { email } });
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

    const token = generarToken({
      userId: userExiste.id,
      userRole: userExiste.role,
    });

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
export const register = async (req, res) => {
  try {
    const { username, email, password } = matchedData(req, {
      locations: ["body"],
    });

    const hasheoPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username,
      email,
      password: hasheoPassword,
      role: "user",
    });
    const { password: _, ...userSinPassword } = newUser.toJSON();
    return res
      .status(201)
      .json({ message: "user registrado con exito", user: userSinPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error interno del servidor", error: error.message });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.status(200).json({ message: "logout exitoso" });
};
