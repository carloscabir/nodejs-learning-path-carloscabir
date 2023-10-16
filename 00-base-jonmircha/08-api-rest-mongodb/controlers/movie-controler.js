"use strict";

let MovieModel = require("../models/movie-model"),
  MovieController = () => {};

MovieController.getAll = (req, res, next) => {
  // Aca el error no va a ser manejado con vistas, sera de otra forma
  MovieModel.getAll((docs) => {
    let locals = {
      title: "Lista de Películas",
      data: docs,
    };

    res.render("index", locals);
  });
};

MovieController.getOne = (req, res, next) => {
  let movie_id = req.params.movie_id;
  console.log(movie_id);

  MovieModel.getOne(movie_id, (docs) => {
    let locals = {
      title: "Editar Pelicula",
      data: docs,
    };

    res.render("edit-movie", locals);
  });
};

MovieController.save = (req, res, next) => {
  let movie = {
    movie_id: req.body.movie_id,
    title: req.body.title,
    released_year: req.body.released_year,
    rating: req.body.rating,
    image_movie: req.body.image_movie,
  };
  console.log(movie);

  MovieModel.save(movie, () => res.redirect("/"));
};

MovieController.delete = (req, res, next) => {
  let movie_id = req.params.movie_id;
  console.log(movie_id);

  MovieModel.delete(movie_id, () => res.redirect("/"));
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
