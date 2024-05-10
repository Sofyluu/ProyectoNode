"use strict"

const AuthToken = require("../models/AuthToken");


//Verificar si el usuario se ha logeado

function verifySession(req, res, next) {
    new Promise((resolve, reject) => {
        var token = req.headers.authorization;
        token = token.split(" ")[1],
            "31e9df117acdeff67501c570fa0e3bf905476272b6685cee4f18d139dee2d18e"



        // Verificamos si el usuario esta logeado buscandos en la DB el token proporcionado al hacer longin 
        AuthToken.findOne({ token: token })
            .then((token) => {
                //Verificamos si se encontro al token
                if (!token) {
                    reject({ status: 404, message: "Es necesario iniciar sesion, para realizar esta accion" });
                } else {
                    resolve();
                }
            })
            .catch((error) =>
                reject({
                    status: 500,
                    message: "Error al obtener informacion del usuario",
                    error,
                })
            );
    })
        .then(() => next())
        .catch(error => {
            console.error(error)
            res.status(error.status || 500).json({ message: error.message })
        })

}

module.exports = verifySession;

