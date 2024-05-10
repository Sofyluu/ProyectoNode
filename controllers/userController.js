"use strict"

//Importamos el modelo de Mongo

const User = require("../models/User");
const bcryptService = require("../services/bcryptService");

// Funciones para obtener todos los usuarios

function getAllUsers(req, res) {
  //Utilizamos el metodo find() de Mongoose para encontrar todos los usuario

  User.find()
    .then((users) => res.status(200).json(users)) //Enviamos todos los usuarios como respuesta
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al obtener usuarios"); //En caso de tener error que envie un mensaje al cliente
    });
}

//Funcion para crear un usuario

function createUser(req, res) {
  //Extraemos toda la informacion del cuerpo de la solicitud

  const { nombre, edad, email, contraseña } = req.body;

  //Creamos un nuevo usuario con el metodo create() de Mongoose

  User.create({ nombre, edad, email, contraseña })
    .then((newUser) => res.status(201).json(newUser)) //Enviamos el nuevo usuario como formato JSON
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al crear Usuario"); //En caso de tener error que envie un mensaje al cliente
    });
}

//Funcion para actualizar

function updateUser(req, res) {
  //Obtenemos el id del usuario a actualizar
  const userId = req.params.id;

  //Obtenemoslos datos actualizados del body de req
  const updatedUser = req.body;

  User.findById(userId)
    .then((user) => {
      if (updatedUser.contraseña == User.contraseña) {
        User.findByIdAndUpdate(userId, updatedUser, { new: true }) //Los 3 parametros del metodo son = 1. usuario a actualizar, 2.datos a actualizar, 3. hace referencia  a que sea actualizado como nuevo
          .then((user) => res.status(200).json(user))
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error al actualizar el Usuarioo"); //En caso de tener error que envie un mensaje al cliente
          });
      } else if (updatedUser.contraseña !== User.contraseña) {
        bcryptService.hashPassword(updatedUser.contraseña)
          .then(hashedPassword => {
            updatedUser.contraseña = hashedPassword;
            User.findByIdAndUpdate(userId, updatedUser, { new: true }) //Los 3 parametros del metodo son = 1. usuario a actualizar, 2.datos a actualizar, 3. hace referencia  a que sea actualizado como nuevo
              .then((user) => res.status(200).json(user))
              .catch((err) => {
                console.error(err);
                res.status(500).send("Error al actualizar el Usuarioo"); //En caso de tener error que envie un mensaje al cliente
              });
          })
          .catch(error => {
            console.error(error);
          })
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al actualizar el Usuarioo"); //En caso de tener error que envie un mensaje al cliente
    });

}

//Funcion para eliminar un usuario

function deleteUser(req, res) {
  //Obtenemos el id del usuario a actualizar
  const userId = req.params.id;

  //Utilizamos el metodo findByIdAndDelete() de Mongoose para buscar y eliminar un usuario por ID

  User.findByIdAndDelete(userId)
    .then(() => res.status(200).send("Usuario eliminado con exito")) //Enviamos una confirmacion al usuario de que se elimino correctamente
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al eliminar el Usuario"); //En caso de tener error se envia un mensaje al cliente
    });
}

//Exportamos todas las funciones para su uso en otras partes

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
};
