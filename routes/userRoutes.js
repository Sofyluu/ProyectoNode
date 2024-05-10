//Importamos express y creamos un router

const express = require("express");
const router = express.Router();

//Importamos el controlador de usuarios

const userController = require("../controllers/userController");

//Importamos middleware
const verifyToken = require("../middleware/verifyToken");
const verifySession = require("../middleware/verifySession")

//Definir las rutas para el CRUD de usuarios

router.get("/", verifySession, verifyToken, userController.getAllUsers); //Ruta para obtener todos los usuarios
router.post("/", userController.createUser); //Ruta para crear un usuario
router.put("/:id", verifySession, verifyToken, userController.updateUser); //Ruta para actualizar un usuario
router.delete("/:id", verifySession, verifyToken, userController.deleteUser); //Ruta para eliminar un usuario

//Exportamos el router para su uso en otras partes

module.exports = router;
