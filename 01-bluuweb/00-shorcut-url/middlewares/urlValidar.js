const { urlencoded } = require("body-parser");
const { URL } = require("url");

const urlValidar = (req, res, next) => {
  try {
    const { origin } = req.body,
      urlFrontend = new URL(origin);
    if (urlFrontend.origin !== "null") {
      if (urlFrontend.protocol == "https:" || urlFrontend.protocol == "http:") {
        return next();
      }
      throw new Error("Tiene que tener https://");
    }
  } catch (err) {
    if (err.message === "Invalid URL") {
      req.flash("mensajes", [{ msg: "URL no valida" }]);
    } else {
      req.flash("mensajes", [{ msg: err.message }]);
    }
    return res.redirect("/");
    // return res.send("no valida");
  }
};

module.exports = urlValidar;
