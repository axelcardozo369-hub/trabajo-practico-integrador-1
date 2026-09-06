import jwt from "jsonwebtoken";

export const generarToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
  } catch (error) {
    throw new Error("error al generar el token: " + error.message);
  }
};
export const verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("error al verificar el token" + error.message);
  }
};
