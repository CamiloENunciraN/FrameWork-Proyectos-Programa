const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {pool} = require("../database/config.db");

/*************************** Noticias ********************************/

const getNoticiasActuales = (request, response) => {
    //para buscar las noticias desde hoy en adelante
    const fechaAct=new Date();
    pool.query("SELECT * FROM Noticia WHERE Fecha>=? ORDER BY Fecha DESC ", [fechaAct],
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de noticias realizada");
        response.status(200).json(results);
    });
//    pool.release();
};

//ruta
app.route("/NoticiasActuales").get(getNoticiasActuales);

const getNoticiasAnteriores = (request, response) => {
    //para buscar las noticias pasadas a hoy
    const fechaAct=new Date();
    pool.query("SELECT * FROM Noticia WHERE Fecha<? ORDER BY Fecha DESC ", [fechaAct],
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de noticias realizada");
        response.status(200).json(results);
    });
//    pool.release();
};

//ruta
app.route("/NoticiasAnteriores").get(getNoticiasAnteriores);

//busca una noticia
const getDatosNoticia = (request, response) => {
    const id=request.params.id;
    pool.query("SELECT * FROM Noticia WHERE IdNoticia=?",
        [id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de noticia: "+results[0].Nombre);
        response.status(200).json(results);
    });
//    pool.release();
};

//ruta
app.route("/DatosNoticia/:id").get(getDatosNoticia);

const getUltimasNoticias = (request, response) => {
    pool.query("SELECT * FROM Noticia ORDER BY Fecha DESC LIMIT 5", 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de ultimas noticias realizada");
        response.status(200).json(results);
    });
//    pool.release();
};

//ruta
app.route("/UltimasNoticias").get(getUltimasNoticias);

//registrar noticia
const registrarNoticia = (request, response) => {
    const datos = request.body;
    console.log("registrar Noticia");
    pool.getConnection((err, connection) => {
    if (err) {
        reject(err);
    } else {
                //vallida que no se encuentre registrada el mismo nombre y misma fecha
                connection.query("SELECT Nombre FROM Noticia WHERE Nombre=? AND fecha=?",
                 [datos.Nombre,datos.Fecha],
                (error, results) => {
                    if(error){
                        throw error;
                    }
                    if(results.length!=0){
                        response.status(200).json({ "mensaje": "La noticia ya se encuentra registrada",
                                                    "peticion": "incorrecta"}); 
                    }else{
                    //registra la noticia
                    const consulta ="INSERT INTO Noticia (Nombre, Fecha, Descripcion, Enlace, Imagen) VALUES (?,?,?,?,?)";
                    connection.query(consulta, [datos.Nombre, datos.Fecha, datos.Descripcion, datos.Enlace, datos.Imagen],
                    (error, results) => {
                        if(error){
                            throw error; 
                        }
                    response.status(201).json({ "mensaje": "Noticia: "+datos.Nombre+" Agregada",
                                                "peticion": "correcta" });

                    });
                        //busca el id de la noticia registrada

                        connection.query("SELECT IdNoticia FROM Noticia WHERE Nombre=?", [datos.Nombre],
                        (error, results) => {
                            if(error){
                                throw error; 
                            }

                             //registra el NoticiaXAdministrador
                                const fechaAct=new Date();
                                connection.query("INSERT INTO NoticiaXAdministrador (IdNoticia, IdAdministrador, Fecha, Descripcion) VALUES (?,?,?,?)", 
                                    [results[0].IdNoticia, datos.IdAdministrador, fechaAct, "Registro Noticia"],
                                (error, results) => {
                                if(error){
                                        throw error; 
                                }
                                 connection.release();
                                });

                        });
                    }

                });
                }
      });

//    pool.release();
};

//ruta
app.route("/RegistrarNoticia").post(registrarNoticia);


//modificar Noticia
const modificarNoticia = (request, response) => {
    const id=request.params.id;
    const datos=request.body;
    pool.query("UPDATE Noticia SET Nombre=? ,Fecha=?, Descripcion=?,Enlace=? ,Imagen=?  WHERE IdNoticia=?",
    [datos.Nombre, datos.Fecha, datos.Descripcion, datos.Enlace , datos.Imagen, id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("modificar noticia: "+id+" realizado");
        response.status(200).json({ "mensaje": "Noticia: "+datos.Nombre+" Modificado",
                                    "peticion": "correcta" });
    });
//    pool.release();
};

//ruta
app.route("/ModificarNoticia/:id").post(modificarNoticia);

//eliminar Noticia
const EliminarNoticia = (request, response) => {
    const id = request.params.id;
    console.log("eliminar noticia");
    pool.query("DELETE FROM Noticia WHERE IdNoticia = ?", 
    [id],
    (error, results) => {
        if(error){
            throw error;
            response.status(200).json({ "mensaje": "ha ocurrido un error"});
        }
        response.status(201).json({ "mensaje": "Noticia: eliminada"});
    });
//    pool.release();
};

//ruta
app.route("/EliminarNoticia/:id").delete(EliminarNoticia);


module.exports = app;