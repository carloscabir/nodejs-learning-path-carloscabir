"use strict";

let http = require("http").createServer(webServer),
  fs = require("fs");

function webServer(req, res) {
  function rdFile(err, data) {
    if (err) throw err;
    res.end(data);
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  fs.readFile("assets/index.html", rdFile);
}

http.listen(3000);

console.log("Server is running with Node.Js in http://localhost:3000");
