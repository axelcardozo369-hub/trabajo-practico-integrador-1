export const adminMiddlware = (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "no autorizado: usuario no autenticado" });
    }
    if (req.user.userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "acceso denegado por no requerir el rol de admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "error interno del servidor y error de middleware en admin",
      error: error.message,
    });
  }
};
