import "dotenv/config";
import express from "express";
import "./database/connectionDb.js";
import router from "./routes/authRouter.js";

const app = express();
app.use(express.json());
app.use(router);

// Server up
app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("running in http://localhost:" + process.env.PORT || 5000);
});
