"use strict";

let express = require("express"),
  app = express();

app
  .get("/", (req, res) => {
    res.send("<h1>Hola Express</h1>");
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000/");
