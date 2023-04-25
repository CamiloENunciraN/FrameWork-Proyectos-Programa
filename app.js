const express = require("express");
const app = express();
const path = require("path");

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// cargar el css del index.html as static
app.use(express.static(__dirname));
//funcion para recibir ENDPOINT
app.get('/', (req, res) => {
//carga por defecto el index.html
});

//cargamos el archivo de rutas
app.use(require('./routes/routes'));

app.listen(process.env.PORT||3000,() => {
    console.log("Servidor corriendo en el puerto: "+process.env.PORT);
});

module.exports = app;