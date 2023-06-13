const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {pool} = require("../database/config.db");


/*************************** proyectos ********************************/

const getProyectos = (request, response) => {
    const datos = request.body;
    PInicial= (datos.pagina-1)*datos.proyectosPorPagina; //5 es el numero de elementos por pagina
    PFinal= PInicial+datos.proyectosPorPagina;
    //tipo,anio,orden,pagina
    var consulta= crearConsultaProyecto(datos);

    pool.query(consulta, 
    (error, results) => {
        if(error)
            throw error;
        var  proyectos = results.map(v => Object.assign({}, v));
        var paginaProyecto = proyectos.slice(PInicial, PFinal)
        response.status(200).json(paginaProyecto);
    });
};

//ruta
app.route("/Proyectos").post(getProyectos);

//busca un proyecto
const getDatosProyecto = (request, response) => {
    const id=request.params.id;
    pool.query("SELECT * FROM Proyecto WHERE IdProyecto=?",
        [id], 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/DatosProyecto/:id").get(getDatosProyecto);


const getNumeroProyectos = (request, response) => {
    const datos = request.body;
    var consulta= crearConsultaProyecto(datos);
    pool.query(consulta, 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json({ NProyectos: results.length });
    });
};

//ruta
app.route("/numeroProyectos").post(getNumeroProyectos);

/*************** metodo que crea el string de la consulta ************/

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

//registrar proyecto
const registrarProyecto = (request, response) => {
    const datos = request.body;
    pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {

            //vallida que no se encuentre registrado
            connection.query("SELECT Nombre FROM Proyecto WHERE Nombre=? AND Autor=?",
             [datos.Nombre,datos.Autor],
            (error, results) => {
                if(error){
                    throw error;
                } 
                if(results.length!=0){
                    response.status(200).json({ "mensaje": "El proyecto ya se encuentra registrado",
                                                "peticion": "incorrecta"}); 
                }else{
                //registra el proyecto
                const consulta ="INSERT INTO Proyecto (Nombre, Fecha, Autor, Descripcion, Enlace, Imagen, Tipo) VALUES (?,?,?,?,?,?,?)";
                connection.query(consulta, [datos.Nombre, datos.Fecha, datos.Autor, datos.Descripcion, datos.Enlace, datos.Imagen, datos.Tipo],
                (error, results) => {
                    if(error){
                        throw error; 
                    }
                response.status(201).json({ "mensaje": "Proyecto: "+datos.Nombre+" Agregado",
                                            "peticion": "correcta" });

                });
                    //busca el id del proyecto registrado
                    connection.query("SELECT IdProyecto FROM Proyecto WHERE Nombre=?", [datos.Nombre],
                    (error, results) => {
                        if(error){
                            throw error; 
                        }
                         //registra el ProyectoXAdministrador
                            const fechaAct=new Date();
                            connection.query("INSERT INTO ProyectoXAdministrador (IdProyecto, IdAdministrador, Fecha, Descripcion) VALUES (?,?,?,?)", 
                                [results[0].IdProyecto, datos.IdAdministrador, fechaAct, "Registro Proyecto"],
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
};

//ruta
app.route("/RegistrarProyecto").post(registrarProyecto);

//modificar proyecto
const modificarProyecto = (request, response) => {
    const id=request.params.id;
    const datos=request.body;
    pool.query("UPDATE Proyecto SET Nombre=? ,Fecha=? ,Autor=?, Descripcion=?,Enlace=? ,Imagen=? ,Tipo=? WHERE IdProyecto=?",
    [datos.Nombre, datos.Fecha, datos.Autor, datos.Descripcion, datos.Enlace , datos.Imagen, datos.Tipo, id], 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json({ "mensaje": "Proyecto: "+datos.Nombre+" Modificado",
                                    "peticion": "correcta" });
    });
};

//ruta
app.route("/ModificarProyecto/:id").post(modificarProyecto);
//eliminar proyecto
const EliminarProyecto = (request, response) => {
    const id = request.params.id;
    pool.query("DELETE FROM Proyecto WHERE IdProyecto = ?", 
    [id],
    (error, results) => {
        if(error){
            throw error;
            response.status(200).json({ "mensaje": "ha ocurrido un error"});
        }
        response.status(201).json({ "mensaje": "Proyecto: eliminado"});
    });
};

//ruta
app.route("/EliminarProyecto/:id").delete(EliminarProyecto);


module.exports = app;