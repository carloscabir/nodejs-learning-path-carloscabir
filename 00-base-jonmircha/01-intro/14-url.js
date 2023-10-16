/* 
URL
https://nodejs.org/api/url.html
Este modulo dispone de utilidades para la resolucion y analisis de URLs

Query String 
https://nodejs.org/api/querystring.html
Este modulo proporciona utilidades para hacer frente a las cadenas de consulta
 */

"use strict";

let http = require("http").createServer(webServer),
  path = require("path"),
  url = require("url"),
  urls = [
    {
      id: 1,
      route: "",
      output: "<h2>Home</h2>",
    },
    {
      id: 2,
      route: "blog",
      output: "<h2>Blog</h2> <p><mark>Bienvenido a mi blog!</mark></p>",
    },
    {
      id: 3,
      route: "contacto",
      output: "<h2>Contacto</h2><p>Ella no te ama :'v</p>",
    },
  ];

function webServer(req, res) {
  let message = "<h1>Hola soy gay</h1>",
    pathurl = path.basename(req.url),
    id = url.parse(req.url, true).query.id;

  console.log(`Path: ${pathurl}, id: ${id}`);

  urls.forEach((el) => {
    if (el.route == pathurl || el.id == id) {
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
