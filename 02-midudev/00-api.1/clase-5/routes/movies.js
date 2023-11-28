import { Router } from "express"

import { moviesRedirectPaginationMiddleware } from "../middlewares/movies.js";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
const moviesRouter = Router()
  
const movieController = new MovieController({ movieModel })

moviesRouter.get("/", moviesRedirectPaginationMiddleware)

moviesRouter.get("/", movieController.getAll)
moviesRouter.post("/", movieController.create)

moviesRouter.get("/:id", movieController.getById)
moviesRouter.delete("/:id",  movieController.delete)
moviesRouter.patch("/:id", movieController.uptade);

return moviesRouter
}