"use strict"

// Importamos express, rutas de usuario y conexion a la db

const express = require("express");
const connectDB = require("./db/db");

//Creamos una instancia de Express



//Importamos las rutas 

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes")

const app = express();
const PORT = 3010;


//Middleware

app.use(express.json()); //Invocamos al middleware para que parsee los datos del body de las solicitudes en formato JSON

//Rutas de Autenticacion

app.use("/api/auth", authRoutes)

//Rutas de Usarios

app.use("/api/users", userRoutes); //Creamos las rutas de usuario en la ruta /api/routes/users

//Rutas de Usuario Actual

app.use("/api/session", sessionRoutes)

//Iniciamos la DB
connectDB();

//Inicializamos el servidor y lo ponemos en escucha en el puerto que pusimos arriba

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto: " + PORT);
});
