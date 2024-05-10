"use strict"

// Importamos Mongoose paracrear la conexion a la DB de mongoDB

const mongoose = require("mongoose");

//Establecemos nuestra url de la base de datos == DB

const mongoDBURL = "mongodb+srv://sofympincay:Mercedes.1997@cluster0.zfbhkba.mongodb.net/proyect"

//funcion para conectarnos a la db
function connectDB() {
    return new Promise((res, rej) => {
        //conectar a la base de datos usando la URL proporcionada
        mongoose
            .connect(mongoDBURL)
            .then(() => {
                console.log("Conexion a la DB establecida correctamente");
                //si lo conexion es exitosa resolvemos la promesa
                res();
            })
            .catch((err) => {
                //Si hay un erro al conectar, imprimir el error y rechazar la promesa
                console.error("Error al conectar a la DB", err);
                rej(err);
            });
    });
}

module.exports = connectDB;