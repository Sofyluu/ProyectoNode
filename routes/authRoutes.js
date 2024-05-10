'use strict'
//Importamos express y creamos un router

const express = require("express");
const router = express.Router();

//Importamos el controlador de authRouter

const authController = require("../controllers/authController");

//Importamos el middleware de Seguridad 

const verifyToken = require("../middleware/verifyToken");
const verifySession = require("../middleware/verifySession")


//Rutas para el Auth del User

router.post("/login", authController.login)

//Ruta para cerrar sesion

router.post("/logout", verifyToken, verifySession, authController.logout)

module.exports = router

