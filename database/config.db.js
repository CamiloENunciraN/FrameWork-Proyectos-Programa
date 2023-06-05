//dotenv nos permite leer las variables de entorno de nuestro .env

const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql2'); //cambio de mysql 1 0 2

const pool = mysql.createPool({
        connectionLimit : 10,
        host: process.env.DBHOST,
        port:process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
});


module.exports = {pool};