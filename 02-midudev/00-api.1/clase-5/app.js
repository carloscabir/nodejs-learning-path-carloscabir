import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

import { MovieModel } from "./models/mysql/movie.js";
import { createMovieRouter } from "./routes/movies.js";


export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware())
  app.disable("x-powered-by");

  app.get("/", (req, res) => {
    res.json({ api: "v1.0.0" });
  });

  app.use("/movies", createMovieRouter({ movieModel }));

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening runing at http://localhost:${PORT}`);
  });

}