const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const User = require("../models/User.js");
const Jimp = require("jimp");

module.exports.formPerfil = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    return res.render("perfil", { user: req.user, imagen: user.imagen });
  } catch (error) {
    req.flash("mensajes", [{ msg: "Error al renderizar el perfil" }]);
    return res.redirect("/perfil");
  }
};

module.exports.editarFotoPerfil = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1025 * 1024; // 50MB

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) throw new Error("Fallo la subida de la imagen");

      console.log(files);
      console.log(fields.file);
      const file = files.file;

      if (file.originalFilename === "") {
        throw new Error("Por favor agrega una imagen");
      }

      const imagesTypes = ["image/png", "image/jpeg"];

      if (!imagesTypes.includes(file.mimetype)) {
        throw new Error("Por favor seleccione una imagen jpeg o png.");
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error("Por favor agrega una imagen inferior a 50MB");
      }

      const extension = file.mimetype.split("/")[1];
      const filename = `${req.user.id}.${extension}`;
      const dirFile = path.join(
        __dirname,
        `../public/images/perfil/${filename}`
      );
      fs.renameSync(file.filepath, dirFile);

      const imgJimp = await Jimp.read(dirFile);
      imgJimp
        .crop(0, 300, 700, 700)
        .resize(200, 200)
        .quality(90)
        .writeAsync(dirFile);

      // Db
      const user = await User.findById(req.user.id);
      user.imagen = filename;
      await user.save();

      // console.log(dirFile);

      req.flash("mensajes", [{ msg: "Imagen subida correctamente" }]);
    } catch (err) {
      console.log(err);
      req.flash("mensajes", [{ msg: err.message }]);
    } finally {
      return res.redirect("/perfil");
    }
  });
};
