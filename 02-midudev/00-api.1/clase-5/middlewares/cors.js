import cors from "cors"

export const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5500",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:4000",
];

// NPM cors omite este proceso manual de cors y da acceso a todos los tipos de peticions simplemente usando su funcion propia
//  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) =>{
  
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
  
    }

    if (!origin) { 
      return callback(null, true)
    }
    
    return callback(new Error("Not allowed by CORS"))
}
})