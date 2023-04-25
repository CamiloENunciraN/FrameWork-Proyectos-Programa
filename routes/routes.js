const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");




const getNoticias = (request, response) => {
    connection.query("SELECT * FROM Noticia ORDER BY Fecha DESC ", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/Noticias").get(getNoticias);


const getUltimasNoticias = (request, response) => {
    connection.query("SELECT * FROM Noticia ORDER BY Fecha DESC LIMIT 5", 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de ultimas noticias realizada");
        response.status(200).json(results);
    });
};

//ruta
app.route("/UltimasNoticias").get(getUltimasNoticias);


const postCarta = (request, response) => {
    const {plato, descripcion, precio, disponible} = request.body;
    connection.query("INSERT INTO carta(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ", 
    [plato, descripcion, precio, disponible],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/carta")
.post(postCarta);


const delCarta = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from carta where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/carta/:id")
.delete(delCarta);


module.exports = app;