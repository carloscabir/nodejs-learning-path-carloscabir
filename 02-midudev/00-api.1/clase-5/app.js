import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";
const app = express();

const PORT = process.env.PORT || 3000;

// Formato experimental soportado, pero no tendra uso
// import movies from "./movies.json" assert { type: "json"}
// Formato soportado, pero no tiene es soportado
// import movies from "./movies.json" with { type: "json"}

// Como leer un json en ESModules
// import fs from "node:fs"
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"))

// Como leer un json en ESModules recomendada (por ahora)
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url)
// export const  readJSON = (path) => require(path)


app.use(json());

// activacion de cors a toda la aplicacion con el middleware casero
app.use(corsMiddleware())
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ api: "v1.0.0" });
});

// Todos los recursos que sean MOVIES se indentifican 
app.use("/movies", moviesRouter);



app.listen(PORT, () => {
  console.log(`Server listening runing at http://localhost:${PORT}`);
});

