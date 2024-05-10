"use strict"

const User = require("../models/User");

//Controlador para obtener informacion sobre el usuario que ha iniciado sesion

function getCurrentUser(req, res) {
    new Promise((resolve, reject) => {
        //El middleware de Auth (verifyToken) ya almaceno el ID del usuario en req.userId
        const userId = req.userId;

        // Busca el usuario en la base de datos utilizando el Id de usuario
        User.findById(userId)
            .then((user) => {
                //Verificamos si se encontro al usuario
                if (!user) {
                    reject({ status: 404, message: "Usuario no encontrado" });
                } else {
                    resolve(user);
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
        .then(user => res.json(user))
        .catch(error => {
            console.error(error)
            res.status(error.status || 500).json({ message: error.message })
        })

}

module.exports = {
    getCurrentUser
}
