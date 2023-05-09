const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../database/config.db");


const getProyectos = (request, response) => {
    const datos = request.body;
    PInicial= (datos.pagina-1)*datos.proyectosPorPagina; //5 es el numero de elementos por pagina
    PFinal= PInicial+5;
    //tipo,anio,orden,pagina
    var consulta= crearConsultaProyecto(datos);

    connection.query(consulta, 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de proyectos realizada");
        var  proyectos = results.map(v => Object.assign({}, v));
        var paginaProyecto = proyectos.slice(PInicial, PFinal)
        response.status(200).json(paginaProyecto);
    });
};

//ruta
app.route("/Proyectos").post(getProyectos);


const getNumeroProyectos = (request, response) => {
    const datos = request.body;
    var consulta= crearConsultaProyecto(datos);
    connection.query(consulta, 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de numero de proyectos");
        response.status(200).json({ NProyectos: results.length });
    });
};

//ruta
app.route("/numeroProyectos").post(getNumeroProyectos);

/*************** metodo que crea el string de la conosulta ************/

function crearConsultaProyecto(datos){

    var consulta="SELECT * FROM Proyecto";
    //agregar filtros a la consulta
    if(datos.anio!=='Todos' && datos.tipo!=='Todos'){
        consulta+=" WHERE YEAR(Fecha)="+datos.anio+" AND tipo='"+datos.tipo+"'";
    }else if(datos.anio==='Todos' && datos.tipo!=='Todos'){
        consulta+=" WHERE tipo='"+datos.tipo+"'";
    }else if(datos.anio!=='Todos' && datos.tipo==='Todos'){
        consulta+=" WHERE YEAR(Fecha)="+datos.anio;
    }

    consulta+=" ORDER BY Fecha "+datos.orden;
    return consulta;
}



const getTipoProyecto = (request, response) => {
    connection.query("SELECT Nombre FROM TipoProyecto", 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de tipo de proyectos");
        response.status(200).json(results);
    });
};

//ruta
app.route("/TipoProyecto").get(getTipoProyecto);

const getNoticias = (request, response) => {
    connection.query("SELECT * FROM Noticia ORDER BY Fecha DESC ", 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de noticias realizada");
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


const iniciarSesion = (request, response) => {
    console.log('peticion de inicio de sesion');
    const datos = request.body;
    var respuesta = { "message": "no se ha iniciado la sesion",
                      "sesion": "Inactiva",
                      "Id": ""};
    //validar el administrador
    var consulta='SELECT Id, Nombre FROM Administrador WHERE Correo='+'"'+datos.email+'"'+'AND Contrasena='+datos.contrasena;
    

    connection.query(consulta, 
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
           //convertir la fecha en string
           var fechaString=fechaAct.getFullYear()+"-"+fechaAct.getMonth()+"-"+fechaAct.getDate();
           consulta = 'UPDATE Sesion SET Fecha="'+fechaString+'" , Estado=1 WHERE IdAdministrador='+bdDatos[0].Id;

            connection.query(consulta, 
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
    //convertir la fecha en string
    var fechaString=fechaAct.getFullYear()+"-"+fechaAct.getMonth()+"-"+fechaAct.getDate();
    consulta = 'UPDATE Sesion SET UltimaSesion="'+fechaString+'" , Estado=0 WHERE IdAdministrador='+datos.id;

            connection.query(consulta, 
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