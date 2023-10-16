"use strict";

let express = require("express"),
  app = express();

app
  .get("/", (req, res) => {
    res.send("<h1>Hola Express</h1>");
  })
  .get("/bextlan", (req, res) => {
    // res.send(
    //   '<h1 style="background-color: thistle; display: inline-block;">Hola Bextlan</h1>' );
    res.redirect(
      //Redireccion a una direccion dada, primer parametro como e codigo de respuesta http (301 === permanent redirection) (revisar codigos de respuesta http); y segundo parametro direccion.
      301,
      "https://www.youtube.com/watch?v=XtpgbmzdHWQ&list=PLvq-jIkSeTUY3gY-ptuqkNEXZHsNwlkND&index=30"
    );
  })
  .get("/json-me", (req, res) => {
    // res.send("<h1>Hola Express</h1>");
    res.json({
      //Nos va ha hacer un parse de nuestro json
      name: "Carlos",
      age: 15,
      twitter: "@taidmc",
    });
  })
  .get("/json-life", (req, res) => {
    // res.send("<h1>Hola Express</h1>");
    res.json({
      name: "An11",
      age: 14,
      ig: "@stupidlovestory",
    });
  })
  .get("/c", (req, res) => {
    res.redirect(301, "https://www.facebook.com/");
  })
  .get("/render", (req, res) => {
    //Nos va a permitir renderizar un archivo externo, solo indicandole su direccion xd
    // res.render("assets/index.html");
    res.render(`${__dirname}assets/index.html`);
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000/");
