const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Tomar el token desde el header del request
  const token = req.header("x-auth-token");

  //Chequear si existe el token
  if (!token) {
    return res.status(401).json({
      message: "You're not authorized to access this resource"
    })
  }

  //Verificar el token y continuar si éste existe y es válido
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();

  } catch(error) {
    res.status(401).json({
      message: "Invalid token"
    })
  }
}