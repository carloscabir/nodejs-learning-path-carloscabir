const express = require("express");
const didto = require("./pokemon/ditto.json");

const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`Peticion al servidor en ruta "${req.url}" `);

  next();
});

app.get("/", (req, res) => {
  // res.status(200).json({ message: "Hola" });
  res.status(200).send("<h1>Hola mundo</h1>");
});

app.post("/pokemon", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    res.status(201).json(data);
  });
});

// Use es como un asterisco de rutas (las no encontradas)
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
