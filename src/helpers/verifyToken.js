import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").split(" ")[1];
    const secret = "12345678987654dfghjhgfdsdfghuytrertyu**//--";

    try {
      const decoded = jwt.verify(token, secret);
      const { rol_id } = decoded;

      const { exp: expDate } = decoded;
      if (Date.now() / 1000 > expDate) {
        res.status(401).send;
      } else {
        req.body.user_rol = rol_id;
        next();
      }
    } catch (error) {
      res.status(500).json({
        httpStatus: 500,
        message: "Ocurrió un error al validar el token",
      });
    }
  } else {
    res.status(401).json({
      httpStatus: 401,
      message: "No se encontró un token valido",
    });
  }
};
