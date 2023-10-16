// Back-end

"use strict";

let express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  port = process.env.PORT || 3000,
  publicDir = express.static(`${__dirname}/public`); // Nuestra carpeta publica

app.use(publicDir).get("/", (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
});

http.listen(port, () => console.log(`http://localhost:${port}`));

io.on("connection", (socket) => {
  socket.broadcast.emit("new user", {
    message: "Ha entrado un usuario al Chat.",
  });

  socket.on("new message", (message) => {
    console.log(message);
    io.emit("user says", message);
  });

  socket.on("disconnect", () => {
    console.log(`Ha salido un usuario del Chat.`);
    socket.broadcast.emit("bye user", {
      message: "Ha salido un usuario del chat",
    });
  });
});
