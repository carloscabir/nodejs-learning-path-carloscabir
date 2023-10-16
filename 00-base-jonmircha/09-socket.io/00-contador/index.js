/* 
Socket.io
  1. Eventos Connection y Disconnect
  2. Podemos crear nuestros propios eventos
  3. emit() Nos permite comunicar un mensaje entre todos los usuarios conectados (incluido al que lo emite)
  4. broadcast.emit() Cuando se comunica un mensaje a todos los clientes, exepto al que lo origina
  5. Los 4 puntos anteriores funcionan en el servidor y en el cliente
*/

"use strict";

let http = require("http").createServer(server),
  fs = require("fs"),
  io = require("socket.io")(http),
  conexions = 0;

function server(req, res) {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("<h1>Error interno del servidor</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data, "utf-8");
    }
  });
}

http.listen(3000);

console.log("http://localhost:3000");

io.on("connection", (socket) => {
  socket.emit("hi", { message: "Hola mundo con Socket.io" });

  socket.on("otro evento que me invente", (data) => {
    console.log(data);
  });

  conexions++;
  console.log(`Conexiones activas: ${conexions}`);

  socket.emit("connect users", { numbers: conexions });
  socket.broadcast.emit("connect users", { numbers: conexions });

  socket.on("disconnect", () => {
    conexions--;
    console.log(`Conexiones activas: ${conexions}`);
    socket.broadcast.emit("connect users", { numbers: conexions });
  });

  socket.on("userAgent", (user) => {
    console.log(user);
    user = JSON.stringify(user);
    socket.emit("userAgent", user);
  });

  // window.open("http://localhost:3000");
});
