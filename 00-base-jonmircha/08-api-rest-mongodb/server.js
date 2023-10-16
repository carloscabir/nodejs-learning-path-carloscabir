"use strict";

let app = require("./app.js"),
  server = app.listen(app.get("port"), () =>
    console.log(`Iniciando Express en http://localhost:${app.get("port")}`)
  );
