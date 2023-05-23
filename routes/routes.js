const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../database/config.db");


/*************************** proyectos ********************************/

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

//busca un proyecto
const getDatosProyecto = (request, response) => {
    const id=request.params.id;
    connection.query("SELECT * FROM Proyecto WHERE IdProyecto=?",
        [id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de proyecto: "+results[0].Nombre);
        response.status(200).json(results);
    });
};

//ruta
app.route("/DatosProyecto/:id").get(getDatosProyecto);


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
    console.log("registrar proyecto");
    //vallida que no se encuentre registrado
    connection.query("SELECT Nombre FROM Proyecto WHERE Nombre=? AND Autor=? AND fecha=?",
     [datos.Nombre,datos.Autor,datos.Fecha],
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
        }

    });
};

//ruta
app.route("/RegistrarProyecto").post(registrarProyecto);

//modificar proyecto
const modificarProyecto = (request, response) => {
    const id=request.params.id;
    const datos=request.body;
    connection.query("UPDATE Proyecto SET Nombre=? ,Fecha=? ,Autor=?, Descripcion=?,Enlace=? ,Imagen=? ,Tipo=? WHERE IdProyecto=?",
    [datos.Nombre, datos.Fecha, datos.Autor, datos.Descripcion, datos.Enlace , datos.Imagen, datos.Tipo, id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("modificar proyecto: "+id+" realizado");
        response.status(200).json({ "mensaje": "Proyecto: "+datos.Nombre+" Modificado",
                                    "peticion": "correcta" });
    });
};

//ruta
app.route("/ModificarProyecto/:id").post(modificarProyecto);
//eliminar proyecto
const EliminarProyecto = (request, response) => {
    const id = request.params.id;
    console.log("eliminar proyecto");
    connection.query("DELETE FROM Proyecto WHERE IdProyecto = ?", 
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


/**************************** tipo proyecto **************************/
//busca todos los tipos de proyectos
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

/*************************** Noticias ********************************/

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

//busca una noticia
const getDatosNoticia = (request, response) => {
    const id=request.params.id;
    connection.query("SELECT * FROM Noticia WHERE IdNoticia=?",
        [id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("peticion de noticia: "+results[0].Nombre);
        response.status(200).json(results);
    });
};

//ruta
app.route("/DatosNoticia/:id").get(getDatosNoticia);

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

//registrar proyecto
const registrarNoticia = (request, response) => {
    const datos = request.body;
    console.log("registrar Noticia");
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
        }

    });
};

//ruta
app.route("/RegistrarNoticia").post(registrarNoticia);


//modificar Noticia
const modificarNoticia = (request, response) => {
    const id=request.params.id;
    const datos=request.body;
    connection.query("UPDATE Noticia SET Nombre=? ,Fecha=?, Descripcion=?,Enlace=? ,Imagen=?  WHERE IdNoticia=?",
    [datos.Nombre, datos.Fecha, datos.Descripcion, datos.Enlace , datos.Imagen, id], 
    (error, results) => {
        if(error)
            throw error;
        console.log("modificar noticia: "+id+" realizado");
        response.status(200).json({ "mensaje": "Noticia: "+datos.Nombre+" Modificado",
                                    "peticion": "correcta" });
    });
};

//ruta
app.route("/ModificarNoticia/:id").post(modificarNoticia);

//eliminar Noticia
const EliminarNoticia = (request, response) => {
    const id = request.params.id;
    console.log("eliminar noticia");
    connection.query("DELETE FROM Noticia WHERE IdNoticia = ?", 
    [id],
    (error, results) => {
        if(error){
            throw error;
            response.status(200).json({ "mensaje": "ha ocurrido un error"});
        }
        response.status(201).json({ "mensaje": "Noticia: eliminada"});
    });
};

//ruta
app.route("/EliminarNoticia/:id").delete(EliminarNoticia);

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