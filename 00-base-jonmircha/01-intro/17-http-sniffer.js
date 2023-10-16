"use strict";

let http = require("http"),
  options = {
    host: "www.mediotiempo.com",
    port: 80,
    path: "/",
  },
  htmlCode = "";

function httpClient(res) {
  console.log(
    `eL sitio ${options.host} ha respondido. Codigo de Estado: ${res.statusCode}`
  );
  res.on("data", function (data) {
    htmlCode += data;
    console.log(data, data.toString());
  });
}

function httpError(err) {
  console.log(
    `El sitio ${options.host} no respondio. Codigo de estado ${err.code}. Error ${err.message}`
  );
}

function webServer(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hola</h1>", htmlCode);
}

//Instancia cliente de HTTP
http.get(options, httpClient).on("error", httpError);
//Instancia de servidor HTTP
http.createServer(webServer).listen(3000);

console.log("Server is running with Node.js");
/* Un sniffer es un codigo que esta olfateando - analizando nuestro codigo en el siguente documento, un ejercicio http sniffer */
