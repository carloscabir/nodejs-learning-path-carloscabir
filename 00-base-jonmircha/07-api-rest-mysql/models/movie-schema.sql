DROP DATABASE IF EXISTS movies;

CREATE DATABASE IF NOT EXISTS movies;

USE movies;

CREATE TABLE IF NOT EXISTS movie(
    movie_id VARCHAR(9) PRIMARY KEY, 
    title VARCHAR(100), -- Title xd?
    release_year VARCHAR(4), -- Year
    rating DECIMAL(2,1), 
    image_movie VARCHAR(255) -- when
);