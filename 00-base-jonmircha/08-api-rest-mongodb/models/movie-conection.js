"use strict";

var mongoose = require("mongoose"),
  conf = require("./db-config.json"),
  Schema = mongoose.Schema, // Creacion de schema gracias a metodo de la api
  // Definicion de nuestro esquema de nuestra coleccion
  MovieSchema = new Schema(
    {
      movie_id: "string",
      title: "string",
      released_year: "string",
      rating: "string",
      image_movie: "string",
    }, // Especificacion del nombre de nuestra coleccion
    {
      collection: "movie",
    }
  ), // Modelo de db, mongosee.model(nombre, esquema)
  MovieModel = mongoose.model("Movie", MovieSchema);

mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.db}`);

module.exports = MovieModel;
