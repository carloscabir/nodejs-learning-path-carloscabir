import { URLFiltersGenerator, readJSON } from "../../utils.js";
const movies = readJSON("./movies.json")

import mysql from "mysql2/promise"
import { MOVIES } from "./queries/movies.js";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "tairitsu",
  database: "moviesdb"
}

const connection = await mysql.createConnection(config)

const PORT = process.env.PORT || 3000;
const BASE_DOMAIN = process.env.BASE_DOMAIN || `http://localhost:${PORT}`;

export class MovieModel { 
  static async getAll({ limit, offset, filters }) {
    const [moviesId] = await connection.query(`
    SELECT BIN_TO_UUID(id) id 
    FROM movie
    LIMIT ? OFFSET ?;
    `, [limit * 1, (offset * 1) === 0 ? 0 : offset * limit])
    
    const paginatedResponse  = await Promise.all(moviesId.map(async (el) => {
      const movie = await this.getById({ id: el.id })
      return movie
    }))

    const response = {
      next: "",
      previous: "",
      results: ""
    };

  const actualOffset = parseInt(offset);
  const actualLimit = parseInt(limit);

    // Pendient for soon
  const filtersParametersUrl = URLFiltersGenerator(filters);

  response.next =
    paginatedResponse.length <= actualLimit
      ? null
      : `${BASE_DOMAIN}/movies?offset=${
          actualOffset + 1
        }&limit=${actualLimit}${filtersParametersUrl}`;
  
  response.previous =
    actualOffset >= 1
      ? `${BASE_DOMAIN}/movies?offset=${
          actualOffset - 1
        }&limit=${actualLimit}${filtersParametersUrl}`
      : null;

  response.results = paginatedResponse;

  return response
  }
  
  static async getById({ id }) { 
    try {
      const [movieByGenres] = await connection.query(MOVIES.GET_MOVIE_AND_GENRES_BY_ID, [id])

      return {
        ...movieByGenres[0],
        genre: movieByGenres.map(el => el.genre),
      }
    } catch (err) {
      return err
    }

    // Before
    /*
    try {
      const [movie, table] = await connection.query(
        MOVIES.GET_MOVIE_BY_ID,
        [id],
        (err) => new Error( err && { message: `Movie with id "${id}" not found` })
      )
      
      const [idGenres] = await connection.query(`
      SELECT genre_id 
      FROM movie_genres
      WHERE movie_id = UUID_TO_BIN(?);
      `, [id])
    
      const allIdGenres = idGenres.map(el => el.genre_id);
    
      let dynamicWhereClausules = ""
      for (const id of allIdGenres) {
        dynamicWhereClausules = dynamicWhereClausules +  `${id} OR id = `
      }
    
      let allGenresNameQuery =  `
      SELECT name
      FROM genre
      WHERE id = ${dynamicWhereClausules}`
      allGenresNameQuery = allGenresNameQuery.slice(0, -8)
      allGenresNameQuery = `${allGenresNameQuery};`
    
      const [genresName] = await connection.query(allGenresNameQuery);
    
    
      const response = {
        ...movie[0],
        genre: genresName.map(genre => genre.name)
      }
      return response
    } catch (err) {
      return err
    }
    */
  }

  static async create({ input }) { 
    const {
      title,
      year,
      duration,
      director,
      rate, 
      poster,
      genre
     } = input

     const [uuidResult] = await connection.query("SELECT UUID() uuid;")
     const [{uuid}] = uuidResult
    
    try {
      await connection.query(
       MOVIES.CREATE_MOVIE,
        [uuid, title, year, duration, director, rate, poster]
      )
      // movie creada! Ya existe un real id!

      let movieAndGenreIdClausulesToInsert = ``;
      for (const g of genre) {
        movieAndGenreIdClausulesToInsert = movieAndGenreIdClausulesToInsert + `((UUID_TO_BIN("${uuid}")), (SELECT id FROM genre WHERE name = "${g}")), `
      }

      let createMovieGenresLinkQuery = `
        INSERT INTO movie_genres (movie_id, genre_id)
        VALUES
        ${movieAndGenreIdClausulesToInsert}`;
      createMovieGenresLinkQuery = createMovieGenresLinkQuery.slice(0, -2)
      createMovieGenresLinkQuery = `${createMovieGenresLinkQuery};`

      await connection.query(createMovieGenresLinkQuery)
      const movie = await this.getById({ id: uuid })
      return movie
    } catch (e) {
      throw new Error(e)
      
      // enviar la traza (informacion sensible) a un servicio interno como:
      // sendlog(e)
    }
  }

  static async delete({ id }) {
    try {
      const [response] = await connection.query(
        MOVIES.DELETE_MOVIE_BY_ID, [id]
      ) 
      
      if (response.serverStatus === 2 && response.affectedRows === 1) return response
    } catch (e) {
      throw new Error("Error creating movie")
    }
    
  }

  static async update({ id, input }) {
    try {
      const { genre, ...movieParsed } = input
      if (genre && Object.keys(movieParsed).length === 0) return { message: "Genre(s) cannot be patch with this HTTP method, if your intention is to patch the genres of a certain movie, please use PUT method" }
      

      let sql = "UPDATE movie SET "
      const params = []

      for (const key in movieParsed) { 
        sql += `${key} = ?, `
        params.push(input[key])
      }

      sql = sql.slice(0, -2)
      sql += "WHERE id = UUID_TO_BIN(?)"
      params.push(id)

      // API query manage error >>> API backend manage error 
      await connection.query(sql, params, (error, results) => {
        if (error) throw error;
       })

      const movie = await this.getById({ id })
      if (!movie) throw new Error("Error requesting updated movie")
 
      return movie
    } catch (e) {
      console.log(e)
      throw new Error("Error updating the movie")
    }
  }
  
}