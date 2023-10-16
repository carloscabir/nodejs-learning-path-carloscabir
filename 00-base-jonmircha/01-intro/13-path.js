/* 
Path
https://nodejs.org/api/path.html
contiene utilidades para manejar y transformar las rutas de los directorios y archivos a formato de cadena.
El sistema de archivos no es consultado para comprobar si los caminos son validos
*/

"use strict";

let http = require("http").createServer(webServer),
  path = require("path"),
  urls = [
    {
      route: "",
      output: "<h2>Home</h2>",
    },
    {
      route: "blog",
      output: "<h2>Blog</h2> <p><mark>Bienvenido a mi blog!</mark></p>",
    },
    {
      route: "contacto",
      output: "<h2>Contacto</h2><p>Ella no te ama :'v</p>",
    },
  ];

function webServer(req, res) {
  let message =
      "<h1>Hola soy gay</h1>" /* El base name leera la ultima direccion que digamos xd(solo la direccion *sin la diagonal*) (documentacion)*/,
    pathurl = path.basename(req.url);

  console.log(pathurl);

  urls.forEach((el) => {
    if (el.route === pathurl) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(message + el.output);
    }
  });
  if (!res.finished) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Error 404: Not found</h1>");
  }
}

http.listen(3000);

console.log("Server is running for http://localhost:3000/");
