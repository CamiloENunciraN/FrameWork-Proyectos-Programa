const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("../database/config.db");



//ruta
app.route("/TipoProyecto").get(getTipoProyecto);

//busca un tipo de proyecto
const getDatosTipoProyecto = (request, response) => {
    const tipo=request.params.tipo;
    connection.query("SELECT * FROM TipoProyecto WHERE Nombre=?",[tipo], 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de tipo de proyecto: "+tipo);
        response.status(200).json(results);
    });
};

//ruta
app.route("/DatosTipoProyecto/:tipo").get(getDatosTipoProyecto);

//registra un tipo de proyecto
const registrarTipoProyecto = (request, response) => {
    const datos = request.body;
    console.log("registrar tipo de proyecto");
    //vallida que no se encuentre registrado
    connection.query("SELECT Nombre FROM TipoProyecto WHERE Nombre=?",
     [datos.Nombre],
    (error, results) => {
        if(error){
            throw error;
        }
        if(results.length!=0){
            response.status(200).json({ "mensaje": "El tipo de proyecto ya se encuentra registrado",
                                        "peticion": "incorrecta"}); 
        }else{
        //registra el tipo de proyecto
        const consulta ="INSERT INTO TipoProyecto (Nombre, Descripcion) VALUES ('"+datos.Nombre+"','"+datos.Descripcion+"')";
        connection.query(consulta, 
        (error, results) => {
            if(error){
                throw error; 
            }
        response.status(201).json({ "mensaje": "Tipo de proyecto: "+datos.Nombre+" Agregado",
                                    "peticion": "correcta" });

        });
        }

    });
};

//ruta
app.route("/RegistrarTipoProyecto").post(registrarTipoProyecto);

//modificar un tipo de proyecto
const modificarTipoProyecto = (request, response) => {
    const tipo=request.params.tipo;
    const datos=request.body;
    connection.query("UPDATE TipoProyecto SET Nombre=? , Descripcion=? WHERE Nombre=?",
    [datos.Nombre, datos.Descripcion, tipo], 
    (error, results) => {
        if(error)
            throw error;
        console.log("modifcar tipo de proyecto: "+tipo+" realizada");
        response.status(200).json({ "mensaje": "Tipo Proyecto: "+datos.Nombre+" Modificado",
                                    "peticion": "correcta" });
    });
};

//ruta
app.route("/ModificarTipoProyecto/:tipo").post(modificarTipoProyecto);

//eliminar un tipo de proyecto
const EliminarTipoProyecto = (request, response) => {
    const tipo = request.params.tipo;
    console.log("eliminar tipo de proyecto");
    connection.query("DELETE FROM TipoProyecto WHERE Nombre = ?", 
    [tipo],
    (error, results) => {
        if(error){
            throw error;
            response.status(200).json({ "mensaje": "ha ocurrido un error"});
        }

        response.status(201).json({ "mensaje": "Tipo de proyecto: "+tipo+" eliminado"});

    });
};

//ruta
app.route("/EliminarTipoProyecto/:tipo").delete(EliminarTipoProyecto);


module.exports = app;