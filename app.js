const express = require("express");
const app = express();
/**************************************/
const dotenv = require("dotenv");
dotenv.config();
//conexión con la base de datos
const {connection} = require("./database/config.db");

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
/*****************************************/
//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   // res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// cargar el css del index.html as static
app.use(express.static(__dirname));
//funcion para recibir ENDPOINT
app.get('/', (req, res) => {
//carga por defecto el index.html
});

app.get('/test', function(req, res) {
  res.json({"mensaje":"hello world"});
});

//cargamos el archivo de rutas
app.use(require('./routes/proyectos'));
app.use(require('./routes/tipoProyecto'));
app.use(require('./routes/noticias'));
app.use(require('./routes/sesion'));

app.listen(process.env.PORT||3000,() => {
    console.log("Servidor corriendo en el puerto: "+process.env.PORT);
});

module.exports = app;