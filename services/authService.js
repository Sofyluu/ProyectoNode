"use strict"

const jwt = require("jsonwebtoken");

//Almacenamos nuestra clave secreta

const JWT_SECRET =
  "31e9df117acdeff67501c570fa0e3bf905476272b6685cee4f18d139dee2d18e";

//Creamos una funcion para generar un token JWT

function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

module.exports = {
  generateToken,
};
