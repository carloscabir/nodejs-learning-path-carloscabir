"use strict";

let express = require("express"),
  favicon = require("serve-favicon"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  routes = require("./route/index.js"),
  faviconURL = `${__dirname}/public/img/hola.jpg`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  port = process.env.PORT || 3000,
  app = express();

app
  .set("views", viewDir)
  .set("view engine", "jade")
  .set("port", port)

  .use(favicon(faviconURL))
  // parse application/json
  .use(bodyParser.json())
  // parse application/x-www-form-urlencoded (binary)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan("dev"))
  .use(publicDir)
  .use(routes);

module.exports = app;
