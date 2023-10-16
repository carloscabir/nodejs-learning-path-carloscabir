"use strict";

let express = require("express"),
  router = express.Router();

const jade = (req, res, next) => {
  let locals = {
    title: "Jade",
    link: "https://jade-lang.com/",
    description: `Jade es un 'Template Engine' (motor de plantillas) de alto perdformance, enfocado en permitir escribir codigo HTML de forma rapida.
      Podriamos decir que se trata de un pre-procesador de codigo HTML; similar a Stylus, Sass (en caso de css). Jade es fuertemente influenciado por HAML e implementado para Javascript con Node.js. Jade usa la Indentacion (sangrado) para definir la jerarquia de nuestro documento HTML, no tendremos que escribir tags html <> || < />, estos seran genreados por Jade al momento de compilar nuestro codigo Jade, valga la redundancia      
      `,
  };

  res.render("index", locals);
};

const ejs = (req, res, next) => {
  let locals = {
    title: "EJS",
    link: "https://www.embeddedjs.com/",
    description: `
    EJS limpia el HTML del JavaScript con plantillas del lado cliente.
    Combina datos y una plantilla para producir HTML. Codigo entre <% %> se ejecuta.
    Codigo entre <%= %> lo aniade al HTML que se resuelve      
      `,
  };

  res.render("index", locals);
};

const err404 = (req, res) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso no encontrado",
      error: error,
    };
  error.status = 404;

  res.render("error", locals);
  next(); // Ejecutara el siguente middleware que este en la pila
};

router
  .get("/", (req, res) => {
    res.end(
      "<h1>Terminamos la configuracion de nuestra primer app en Express.js</h1>"
    );
  })
  .get("/jade", jade)
  .get("/ejs", ejs)
  .use(err404);

module.exports = router;
