"use strict"

const jwt = require('jsonwebtoken'); // Importa el módulo JWT

function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;

    if (!token) {
      reject({
        status: 401,
        message: "Token de autenticacion no proporcionado",
      });
    }

    jwt.verify(
      token.split(" ")[1],
      "31e9df117acdeff67501c570fa0e3bf905476272b6685cee4f18d139dee2d18e",
      (error, decodedToken) => {
        if (error) {
          reject({ status: 401, message: "Token de autenticacion no valido" });
        } else {
          req.userId = decodedToken.userId; //Agregamos el ID de usuario decodificado para su posterior uso
          resolve();
        }
      }
    );
  })
    .then(() => next()) // Da continuidad al siguiente middleware o del siguiente controlador
    .catch((error) =>
      res.status(error.status || 500).json({ message: error.message })
    );
}

module.exports = verifyToken;
