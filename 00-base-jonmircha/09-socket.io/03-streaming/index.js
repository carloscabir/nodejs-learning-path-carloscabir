"use strict";

// const { Socket } = require("socket.io");

let app = require("express")(),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  port = process.env.PORT || 3000,
  publicDir = `${__dirname}/public`;

http.listen(port, () => {
  console.log("http://localhost:%d", port);
});

app
  //
  .get("/", (req, res) => {
    res.sendFile(`${publicDir}/client.html`);
  })
  .get("/streaming", (req, res) => {
    res.sendFile(`${publicDir}/server.html`);
  });

io.on("connection", (socket) => {
  socket.on("streaming", (image) => {
    // let video = image;
    io.emit("play stream", { image });
  });
});
