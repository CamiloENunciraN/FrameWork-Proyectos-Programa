//dotenv nos permite leer las variables de entorno de nuestro .env
/*
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql');
let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DBHOST,
        port:process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};
*/
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
        host: process.env.DBHOST,
        port:process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }

  console.log('Conexión exitosa a la base de datos.');
});
module.exports = {connection};