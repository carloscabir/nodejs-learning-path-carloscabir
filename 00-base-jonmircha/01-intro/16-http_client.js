"use strict";

let http = require("http"),
  options = {
    host: "jonmircha.com",
    port: 3000,
    path: "/",
  };

http
  .get(options, function (res) {
    console.log(
      `eL sitio ${options.host} ha respondido. Codigo de Estado: ${res.statusCode}`
    );
  })
  .on("error", function (err) {
    console.log(
      `El sitio ${options.host} no respondio. Codigo de estado ${err.errorCode}. Error ${err.message}`
    );
  });

/* Un sniffer es un codigo que esta olfateando - analizando nuestro codigo en el siguente documento, un ejercicio http sniffer */
