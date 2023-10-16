/* "Use strict";

let express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session");

app
  .use(cookieParser())
  .use(cookieSession({ secret: "secreto" }))

  .get("/", (req, res) => {
    req.session.visitas || (req.session.visitas = 0);
    let n = req.session.visitas++;

    res.end(`
    <h1>
    Hola desde Express, me has visitado <mark>${n}</mark> veces
    </h1>
    `);
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000/");
 */

"use strict";

let express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session");

app
  .use(cookieParser())
  .use(cookieSession({ secret: "secret" }))
  .get("/", (req, res) => {
    req.session.visits || (req.session.visits = 0);
    let n = req.session.visits++;
    res.send(`<h1>Tus visitas en esta pagina han sido ${n} veces</h1>`);
  })
  .listen(3000);

console.log("Server is running in http://localhost:3000");
