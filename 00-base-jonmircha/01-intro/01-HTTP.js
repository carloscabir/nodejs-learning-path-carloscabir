"use strict";

var http = require("http");
//Recuerda que un servidor pide una peticion y da una respuesta
function webServer(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" }); //Nuestro codigo se leeria asi, el objeto res va a ejecutar primero un writeHead como parametros (el codigo 200 del servidor y enseguida un codigo en formato JSON  )
  res.end("<h1> Hello Node.js</h1>"); //Y luego un end con el mensaje node.js
} //Esto lo habiamos hecho todo en un solo res, pero como esta englosado en una funcion no deja hacer esto como en el otro de abajo xd

http.createServer(webServer).listen(3000, "localhost"); //al igual que arriba; el metodo http primero va a crear un server(webServer) y posteriormente a ello le decimos a que escuche 'listen' el puerto 3000 (que vamos a trabajar con este puerto (aunque podemos trabajar con cualquier puerto xd))y un localhost, y al ultimo nuestro mensaje

console.log("Server runing at our localhost, like");

//Lo que hacemos al final es usar la funcion con el nombre de crear el server (que es lo que hace) y pues asignarlo al http
