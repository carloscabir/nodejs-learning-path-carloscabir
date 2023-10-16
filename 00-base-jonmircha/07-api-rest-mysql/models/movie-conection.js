//Conexion ()
// db-config.json (configuracion de la data-base para mantener la logica de programacion de nuestra app integra (a la hora de subir a produccion))

"use strict";

var mysql = require("mysql"),
  conf = require("./db-config.json"),
  dbOptions = {
    host: conf.mysql.host,
    port: conf.mysql.port,
    user: conf.mysql.user,
    password: conf.mysql.pass,
    database: conf.mysql.db,
  },
  myConn = mysql.createConnection(dbOptions); //Metodo propio de mysql (parametro === opciones)

//Check mysql documentation NPM
myConn.connect((err) => {
  return err
    ? console.log(`Error al conectarse con MySQL: ${err.stack}`)
    : console.log(`Conexion establecida con MySQL NO: ${myConn.threadId}`);
});

// console.log(conf.mysql);
module.exports = myConn;
