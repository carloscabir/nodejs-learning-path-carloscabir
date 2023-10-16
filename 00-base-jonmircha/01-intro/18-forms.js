"use strict";

let http = require("http").createServer(webServer),
  form = require("fs").readFileSync("assets/forms.html"), //Un read file sincrono, lo unico que necesitamos es la direccion (sin callback)
  querystring = require("querystring"),
  util = require("util"),
  dataString = "";

function webServer(req, res) {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form);
  }

  if (req.method === "POST") {
    req
      .on("data", function (data) {
        dataString += data;
      })
      .on("end", function () {
        let dataObj = querystring.parse(dataString),
          dataJSON = util.inspect(dataObj),
          templateString = `
          Tus datos enviados por POST como string son: ${dataString}
          Tus datos enviados por POST como string son: ${dataJSON}
          
          `;

        console.log(templateString);
        res.end(templateString);
      });
  }
}

http.listen(3000);

console.log("Server is running with Node.js in http://localhost:3000/");
