"use strict";

let express = require("express"),
  app = express();

//https://www.mientrastantoenmexico.mx/el-comparador-financiero-money24-ofrece-prestamos-online-rapido-y-seguro/

app
  .get("/", (req, res) => {
    res.send("<h1>Hola desde Express dx</h1>");
  })
  .get("/user/:id-:name-:age", (req, res) => {
    //Tenemos que respetar el paso de parametros
    res.send(
      `<h1>
      Bienvenid@ a Express usuario <b>${req.params.name}</b>, con el ID <b>${req.params.id}</b> y edad  de <b> ${req.params.age} </b> :D!
      </h1>`
    ); //Params es un metodo de req para el paso de parametros?(revisar documentacion de Express)
  })
  .get("/search/", (req, res) => {
    res.end(`
    <h1>
    Bienvenido a Express, los resultados de tu busqueda son: <b style="background-color: thistle;">${req.query.s}</b>
    </h1>
    `);
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000/");
