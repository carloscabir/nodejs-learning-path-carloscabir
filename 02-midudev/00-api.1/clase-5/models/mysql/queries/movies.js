export const MOVIES = {
  GET_ALL_MOVIES: `
    SELECT *, BIN_TO_UUID(id) id
    FROM movie
    LIMIT 5 OFFSET 0;
  `,
  GET_MOVIE_BY_ID:`
    SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(movie.id) movie_id  
    FROM movie
    WHERE movie.id = UUID_TO_BIN(?);
  `,
  CREATE_MOVIE: `
    INSERT INTO movie (id, title, year, duration, director, rate, poster)
    VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);
  `,
  DELETE_MOVIE_BY_ID: `
    DELETE FROM movie
    WHERE id = UUID_TO_BIN(?);
  `,
  GET_MOVIE_AND_GENRES_BY_ID: `
    SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate,
      (SELECT g.name 
      FROM genre AS g 
      WHERE g.id = mg.genre_id) AS genre
    FROM movie AS m
    JOIN movie_genres AS mg
      ON mg.movie_id = m.id
    WHERE m.id = UUID_TO_BIN(?);
  `,
}
