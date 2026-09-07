import { verificarToken } from "../helpers/jwt.helper.js";
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "no hay autorizacion: el token no es proporcionado" });
    }
    const decoded = verificarToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error interno del servidor", error: error.message });
  }
};
