const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../database/config.db");

//***************************** funciones  sesion ***********************//
const iniciarSesion = (request, response) => {
    console.log('peticion de inicio de sesion');
    const datos = request.body;
    var respuesta = { "message": "no se ha iniciado la sesion",
                      "sesion": "Inactiva",
                      "Id": ""};
    //validar el administrador
    var consulta='SELECT Id, Nombre FROM Administrador WHERE Correo=? AND Contrasena=?';
    

    connection.query(consulta, [datos.email, datos.contrasena] ,
    (error, results) => {
        if(error){
            throw error;
        }

        //valida si coinciden los datos
        if(results.length==0){
            console.log('Administrador no encontrado');
            response.status(200).json(respuesta);
        }else{
            //iniciar sesion
           var  bdDatos = results.map(v => Object.assign({}, v));
           console.log('Administrador '+bdDatos[0].Nombre+' encontrado');
           //fecha actual
           fechaAct=new Date();

           consulta = 'UPDATE Sesion SET Fecha=? , Estado=1 WHERE IdAdministrador=?';

            connection.query(consulta, [fechaAct,bdDatos[0].Id],
            (error, results) => {
            if(error){
                throw error;
            }

            respuesta = { "message": "se ha iniciado la sesion",
                            "sesion": "Activa",
                            "Id": bdDatos[0].Id};

            console.log('sesion iniciada');
            response.status(200).json(respuesta);
            });
        }
    });
};

//ruta
app.route("/iniciarSesion").post(iniciarSesion);


const cerrarSesion = (request, response) => {
    console.log('peticion de cierre de sesion');
    const datos = request.body;
    //modificar la sesion guardar llos datos
    //fecha actual
    fechaAct=new Date();

    consulta = 'UPDATE Sesion SET UltimaSesion=? , Estado=0 WHERE IdAdministrador=?';

            connection.query(consulta, [fechaAct , datos.id],
            (error, results) => {
            if(error){
                throw error;
            }
            var respuesta = { "message": "se ha cerrado la sesion",
                                "sesion": "Inactiva" };

            console.log('sesion cerrada');
            response.status(200).json(respuesta);
            });
};


//ruta
app.route("/cerrarSesion").post(cerrarSesion);

module.exports = app;