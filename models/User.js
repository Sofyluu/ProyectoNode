"use strict"

//Importamos mongoose par a definir y tener el esquema 

const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");
const { hash } = require("bcrypt");


//Definimos el esquema de usuario utilizando el constructor de Mongoose llamado schema

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true //el nombre es obligatorio
    },
    edad: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true //El correo tiene que ser unico 
    },
    contraseña: {
        type: String,
        require: true
    }
})

//Antes de guardar un nuevo usuario  vamos a hasehar la contraseña

userSchema.pre("save", function (next) {
    if (!this.isModified("contraseña")) {
        return next()
    }

    bcryptService.hashPassword(this.contraseña)
        .then(hashedPassword => {
            this.contraseña = hashedPassword;
            next()
        })
        .catch(error => {
            console.error(error);
            next(error)
        })
})


//Crear el modelo user utilizando el esquema deinido anteriormente

const User = mongoose.model("User", userSchema)

//Exportamos el modelu User

module.exports = User;