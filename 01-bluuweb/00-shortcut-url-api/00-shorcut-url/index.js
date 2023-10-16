const express = require("express"),
  { create } = require("express-handlebars"),
  session = require("express-session"),
  flash = require("connect-flash"),
  passport = require("passport");
const User = require("./models/User");
const csrf = require("csurf");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const mongoSanitize = require("express-mongo-sanitize");

require("dotenv").config();
const clientDB = require("./database/db.js");

const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.PATHHEROKU || "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: false,
    name: "session-cat",
    store: MongoStore.create({
      clientPromise: clientDB,
      dbName: process.env.DBNAME,
    }),
    cookie: {
      secure: process.env.MOOD === "production",
      maxAge: 30 * 24 * 60,
    },
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Mis preguntas
// Crea la sesion
passport.serializeUser((user, done) =>
  done(null, { id: user._id, username: user.username })
); // req.user

// A la hora de refrescar desseralizamos al usuario y busca al usuario
passport.deserializeUser(async (user, done) => {
  // Es necesario reisar la base de datos ???
  const userDB = await User.findById(user.id);
  return done(null, { id: userDB._id, username: userDB.username });
});

app.get("/mensaje-flash", (req, res) => {
  res.json(req.flash("mensaje"));
});

app.get("/crear-mensaje", (req, res) => {
  req.flash("mensaje", "este es un mensaje de error");
  res.redirect("/mensaje-flash");
});

const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});

// Set Template Engine
app
  .engine(".hbs", hbs.engine)
  .set("view engine", ".hbs")
  .set("views", "./views");

// Middlewares
app.use(express.urlencoded({ extended: true }));

app.use(csrf());

app.use(mongoSanitize());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.mensajes = req.flash("mensajes");
  next();
});

app.use("/", require("./Routes/Home.js"));
app.use(express.static(`${__dirname}/public`));
app.use("/auth", require("./Routes/auth.js"));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
