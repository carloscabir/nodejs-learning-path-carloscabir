"use strict";

let express = require("express"),
  // path = require("path"),
  favicon = require("serve-favicon"),
  morgan = require("morgan"),
  // jade = require("jade"),
  // ejs = require("ejs"),
  routes = require("./route/index.js"), //quizá
  faviconURL = `${__dirname}/public/img/hola.jpg`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  port = process.env.PORT || 3000,
  app = express();

app
  //Configurando app (Solo se puede ejecutar un modulo de view engines en un generador, por lo que eligiremos EJS)
  .set("views", viewDir)
  .set("view engine", "jade")
  // .set("view engine", "ejs")
  .set("port", port)
  //Configurando middlewares
  .use(favicon(faviconURL))
  .use(morgan("dev")) //Lo que hará morgan es un registro de actividad, por ejemplo un GET
  .use(publicDir)
  //Ejecuto el middleware Enrutador
  .use("/", routes);

module.exports = app;
