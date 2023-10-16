const http = require("node:http");
const fs = require("node:fs");

const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          return res.end("<h1>Hola Inicio</h1>");

        case "/contacto":
          return res.end("<h1>Contacto</h1>");

        case "/gato.webp":
          fs.readFile("./gato.webp", (err, data) => {
            if (err) {
              res.statusCode = 500;
              return res.end("<h1>Error 500: Internal Error</h1>");
            }

            res.setHeader("Content-Type", "image/webp");
            return res.end(data);
          });
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));

        default:
          res.statusCode = 404;
          return res.end(" <h1>Error 404: Not found</h1>");
      }

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });

            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          return res.end("404 Not found");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log("Server running at hhtp://localhost:3000");
});
