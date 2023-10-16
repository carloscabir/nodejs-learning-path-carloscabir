const { nanoid } = require("nanoid");
const Url = require("../models/Url.js");

const readUrls = async (req, res) => {
  try {
    // Con lean debido a nuestro hbs que le cuesta leer estos archivos (pug GOD)
    const urls = await Url.find({ user: req.user.id }).lean();

    res.render("home", { urls });
  } catch (error) {
    /*  console.log(error);
    res.send("fallo algo"); */
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/");
  }
};

const addUrl = async (req, res) => {
  const { origin } = req.body;

  try {
    const url = new Url({ origin, shortURL: nanoid(8), user: req.user.id });
    await url.save();
    req.flash("mensajes", [{ msg: "Url agregada con exito" }]);
    res.redirect("/");
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  try {
    // await Url.findByIdAndDelete(id);
    const url = await Url.findById(id);
    if (!url.user.equals(req.user.id)) {
      throw new Error("No es tu url payaso");
    }

    await url.remove();
    req.flash("mensajes", [{ msg: "Url eliminada con exito" }]);

    res.redirect("/");
  } catch (err) {
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/");
  }
};

const editFormUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findById(id).lean();

    if (!url.user.equals(req.user.id)) throw new Error("No es tu URL pibe");

    res.render("home", { url });
  } catch (err) {
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/");
  }
};

const editUrl = async (req, res) => {
  const { id } = req.params,
    { origin } = req.body;

  try {
    const url = await Url.findById(id);
    if (!url.user.equals(req.user.id)) throw new Error("No es tu URL");

    await url.updateOne({ origin });
    req.flash("mensajes", [{ msg: "URL actualizada con exito" }]);
    // await Url.findByIdAndUpdate(id, { origin: origin });
    res.redirect("/");
  } catch (err) {
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/");
  }
};

const redirect = async (req, res) => {
  const { shorturl } = req.params;
  console.log(shorturl);
  try {
    const urlDB = await Url.findOne({ shortURL: shorturl });
    res.redirect(urlDB.origin);
  } catch (err) {
    req.flash("mensajes", [{ msg: "No existe esta URL configurada" }]);
    return res.redirect("/");
  }
};

module.exports = {
  readUrls,
  addUrl,
  deleteUrl,
  editFormUrl,
  editUrl,
  redirect,
};
