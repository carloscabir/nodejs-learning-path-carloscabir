"use strict";

let conn = require("./movie-conection"),
  MovieModel = () => {};

MovieModel.getAll = (cb) => {
  // Tendremos que hacer uso de un Auxiiar de expresiones regulares. En este pasando una Callback junto al error y los DOCUMENTOS (noSQL/documents). Y mandamos la callback para nuestro controlador
  conn.find().exec((err, docs) => {
    if (err) throw err;

    cb(docs);
  });
};

MovieModel.getOne = (id, cb) => {
  conn.findOne({ movie_id: id }).exec((err, docs) => {
    if (err) throw err;
    cb(docs);
  });
};

MovieModel.save = (data, cb) => {
  conn.count({ movie_id: data.movie_id }).exec((err, count) => {
    if (err) throw err;
    console.log("Numero de docs: " + count);

    if (count == 0) {
      // Sin necesidad de Auxiliar
      conn.create(data, (err) => {
        if (err) throw err;
        cb(data);
      });
    } else if (count == 1) {
      // WHERE, UPDATE, CB
      conn.findOneAndUpdate(
        { movie_id: data.movie_id },
        {
          title: data.title,
          release_year: data.release_year,
          rating: data.rating,
          image_movie: data.image_movie,
        },
        (err) => {
          if (err) throw err;
          cb(data);
        }
      );
    }
  });
};

MovieModel.delete = (id, cb) => {
  conn.remove({ movie_id: id }, (err) => {
    if (err) throw err;
    cb();
  });
};

module.exports = MovieModel;
