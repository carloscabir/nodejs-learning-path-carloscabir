"use strict";

let http = require("http").createServer(webServer),
  fs = require("fs"), //Recuerda que siempre que queramos leer un archivo necesitaremos el fileSystem (fs)
  path = require("path"),
  url = require("url"),
  urls = [
    {
      id: 1,
      route: "",
      output: "assets/index.html",
    },
    {
      id: 2,
      route: "blog",
      output: "assets/blog.html",
    },
    {
      id: 3,
      route: "contacto",
      output: "assets/contacto.html",
    },
    {
      id: 4,
      route: "yo",
      output: "assets/yo.html",
    },
    {
      id: 5,
      route: "error",
      output: "assets/error.html",
    },
  ];

function webServer(req, res) {
  let pathurl = path.basename(req.url),
    id = url.parse(req.url, true).query.id;

  console.log(`Path: ${pathurl}, id: ${id}`);

  urls.forEach((el) => {
    if (el.route == pathurl || el.id == id) {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile(el.output, (error, data) => {
        if (error) throw error;
        res.end(data);
      });
    }
  });
  if (!res.finished) {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.readFile("assets/error.html", (error, data) => {
      if (error) throw error;
      res.end(data);
    });
  }
}

http.listen(3000);

console.log("Server is running for http://localhost:3000/");
