"use strict";

var movies = require("../models/movies"),
  express = require("express"),
  router = express.Router();

const err404 = (req, res, next) => {
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
  .use(movies)

  .get("/", (req, res, next) => {
    req.getConnection((err, movies) => {
      movies.query("SELECT * FROM movie", (err, rows) => {
        if (err) {
          next(new Error("No hay regitros de Películas"));
        } else {
          let locals = {
            title: "Lista de Películas",
            data: rows,
          };

          res.render("index", locals);
        }
      });
    });
    // next();
  })
  .get("/agregar", (req, res, next) => {
    res.render("add-movie", { title: "Agregar Película" });
  })
  .post("/", (req, res, next) => {
    req.getConnection((err, movies) => {
      let movie = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        release_year: req.body.release_year,
        rating: req.body.rating,
        image_movie: req.body.image_movie,
      };

      console.log(movie);
      /* 
      En nuestro query tenemos "?", esto es un comodin para el siguente data que este delante de él,
      en este caso es nuestro object movie
       */
      movies.query(`INSERT INTO movie SET ?`, movie, (err, rows) => {
        return err
          ? next(new Error("Hubo un error al insertar el registro"))
          : res.redirect("/");
      });
    });
  })
  .get("/editar/:movie_id", (req, res, next) => {
    let movie_id = req.params.movie_id;

    console.log(movie_id);

    req.getConnection((err, movies) => {
      movies.query(
        "SELECT * FROM movie WHERE movie_id = ?",
        movie_id,
        (err, rows) => {
          console.log(err, "---", rows);
          if (err) {
            next(new Error("Registro no encontrado"));
          } else {
            let locals = {
              title: "Editar Pelicula",
              data: rows,
            };

            res.render("edit-movie", locals);
          }
        }
      );
    });
  })
  .post("/actualizar/:movie_id", (req, res, next) => {
    req.getConnection((err, movies) => {
      let movie = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        release_year: req.body.release_year,
        rating: req.body.rating,
        image_movie: req.body.image_movie,
      };

      console.log(movie);

      movies.query(
        `UPDATE INTO movie SET ? WHERE movie_id = ?`,
        [movie, movie.movie_id],
        (err, rows) => {
          return err
            ? next(new Error("Error al actualizar"))
            : res.redirect("/");
        }
      );
    });
  })
  .post("/eliminar/:movie_id", (req, res, next) => {
    let movie_id = req.params.movie_id;

    console.log(movie_id);

    req.getConnection((err, movies) => {
      movies.query(
        "DELETE * FROM movie WHERE movie_id = ?",
        movie_id,
        (err, rows) => {
          console.log(err, "---", rows);
          return err
            ? next(new Error("Registro no encontrado"))
            : res.redirect("/");
        }
      );
    });
  })
  .use(err404);

module.exports = router;
