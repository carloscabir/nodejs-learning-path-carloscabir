const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.PORT || 3000;

const processRequest = require("routing.js");

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Running at http://localhost:${desiredPort}`);
});
