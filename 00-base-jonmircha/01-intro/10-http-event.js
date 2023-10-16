"use strict";

let http = require("http").createServer();

function webServer(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello from Node.js</h1>");
}

http.on("request", webServer).listen(3000, "localhost");

console.log("Server is running for http://localhost:3000/");
