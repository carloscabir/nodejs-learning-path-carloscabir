const express = require("express"),
  router = express.Router();

const {
  readUrls,
  addUrl,
  deleteUrl,
  editFormUrl,
  editUrl,
  redirect,
} = require("../controlers/homeController");
const {
  formPerfil,
  editarFotoPerfil,
} = require("../controlers/perfilController");
const urlValidar = require("../middlewares/urlValidar");
const verificarUser = require("../middlewares/verificarUser");

router.get("/perfil", verificarUser, formPerfil);
router.post("/perfil", verificarUser, editarFotoPerfil);

router.get("/", verificarUser, readUrls);
router.post("/", verificarUser, urlValidar, addUrl);
router.get("/delete/:id", deleteUrl);
router.get("/edit/:id", editFormUrl);
router.post("/edit/:id", urlValidar, editUrl);
router.get("/:shorturl", redirect);

module.exports = router;
