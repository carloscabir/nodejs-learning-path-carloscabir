// Dirigir comunicacion de nuestros modelos y vistas (parecido a la logica de router de nuestro anterior ejercicio)
"use strict";

let MovieModel = require("../models/movie-model"),
  MovieController = () => {};

MovieController.getAll = (req, res, next) => {
  MovieModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };

      res.render("index", locals);
    }
  });
};

MovieController.getOne = (req, res, next) => {
  let movie_id = req.params.movie_id;
  console.log(movie_id);

  MovieModel.getOne(movie_id, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro de la pelicula con el id: ${movie_id}`,
        description: "Error de existencia de ID",
        error: err,
      };

      res.render("error", locals);
    } else {
      let locals = {
        title: "Editar Pelicula",
        data: rows,
      };

      res.render("edit-movie", locals);
    }
  });
};

// MovieController.insert = (req, res, next) => {
//   let movie = {
//     movie_id: req.body.movie_id,
//     title: req.body.title,
//     release_year: req.body.release_year,
//     rating: req.body.rating,
//     image_movie: req.body.image_movie,
//   };
//   console.log(movie);

//   MovieModel.insert(movie, (err, rows) => {
//     if (err) {
//       let locals = {
//         title: `Error al agregar el registro con el ID: ${movie.movie_id}`,
//         description: "Error de sintaxis SQL",
//         error: err,
//       };
//       res.render("error", locals);
//     } else {
//       res.redirect("/");
//     }
//   });
// };

// MovieController.update = (req, res, next) => {
//   let movie = {
//     movie_id: req.body.movie_id,
//     title: req.body.title,
//     release_year: req.body.release_year,
//     rating: req.body.rating,
//     image_movie: req.body.image_movie,
//   };
//   console.log(movie);

//   MovieModel.update(movie, (err, rows) => {
//     if (err) {
//       let locals = {
//         title: `Error al editar el registro de la pelicula con el id: ${movie.movie_id}`,
//         description: "Error de edicion de pelicula",
//         error: err,
//       };

//       res.render("error", locals);
//     } else {
//       res.redirect("/");
//     }
//   });
// };

MovieController.save = (req, res, next) => {
  let movie = {
    movie_id: req.body.movie_id,
    title: req.body.title,
    release_year: req.body.release_year,
    rating: req.body.rating,
    image_movie: req.body.image_movie,
  };
  console.log(movie);

  MovieModel.save(movie, (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al guardar el registro de la pelicula con el id: ${movie.movie_id}`,
        description: "Error de guardar la pelicula",
        error: err,
      };

      res.render("error", locals);
    } else {
      console.log(rows);
      res.redirect("/");
    }
  });
};

MovieController.delete = (req, res, next) => {
  let movie_id = req.params.movie_id;
  console.log(movie_id);

  MovieModel.delete(movie_id, (err, movies) => {
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${movie_id}`,
        description: "Error al eliminar pelicula",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.redirect("/");
    }
  });
};

MovieController.addForm = (req, res, next) => {
  res.render("add-movie", { title: "Agregar Película" });
};

MovieController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso no encontrado",
      error: error,
    };
  error.status = 404;

  res.render("error", locals);
  next();
};

module.exports = MovieController;
