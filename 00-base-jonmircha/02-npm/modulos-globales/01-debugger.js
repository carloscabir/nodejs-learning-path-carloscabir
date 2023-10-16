// Hacer Debug con el core de node
// https://nodejs.org/api/debugger.html
// En la terminal ejecutar node debug nombre script.js  XXXXX

"use strict";

var http = require("http");

function webServer(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  debugger; // Esto sera un breakpoint, pero si insertamos play en nuestro debug (ventana gracias a inspector y node-inspector) el codigo se seguira ejecutando normalito, de lo contrario no se ejecutara (recuerda, la salida esta debajo de este comentario). Podemos poner tantos debuggers como querramos piola, pero recuerda, siempre llamandolo con la API debug o debugger
  res.end("<h1>Hello Node.js</h1>");
}
http.createServer(webServer).listen(3000, "localhost");

console.log("Server runing at our localhost, like");
//Solo crea un breakpoint donde empezemos a debuggear, y nos va a dar datos sobre el nose XDDDDDDDDD, pero el debugg se hace insertando en la terminal la api dicha (que no funciona xd) "node debug nombre-archivo"
// Old versions, now, are no>

console.log("Hola");
