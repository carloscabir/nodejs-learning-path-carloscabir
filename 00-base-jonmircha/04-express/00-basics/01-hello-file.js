"use strict";

let express = require("express"),
  app = express();

app
  .get("/", (req, res) => {
    res.sendFile(`${__dirname}/assets/index.html`);
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000/");
