const { nanoid } = require("nanoid");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const registerForm = (req, res) => {
  res.render("register");
};

const loginForm = (req, res) => {
  // Mensaje flash
  res.render("login");
};

const registerUser = async (req, res) => {
  // Errores de la validacion hecha con express-validator.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/register");
  }

  const { username, email, password } = req.body;
  try {
    // Buscamos correo, si existe chao chao
    let user = await User.findOne({ email: email });
    if (user) throw new Error("Ya existe el usuario");

    // nuevo modelo y procedemos a guardarlos
    user = new User({ username, email, password, tokenConfirm: nanoid() });
    await user.save();

    // res.json(user);

    req.flash("mensajes", [
      { msg: "Revisa tu correo electronico y valida cuenta" },
    ]);
    return res.redirect("/auth/login");
  } catch (err) {
    // res.json({ error: err.message });
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/auth/register");
  }
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ tokenConfirm: token });

    if (!user) throw new Error(`No existe el usuario con el token ${token}`);

    user.confirmatedAccount = true;
    user.tokenConfirm = null;

    // Enviar correo electronico con la confirmacion de la cuenta (CORS with FTP or nodemailer)

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSEMAIL,
      },
    });

    await transport.sendMail({
      from: "Carlos cabi",
      to: user.email,
      subject: "Verificacion de tu cuenta",
      html: `<a href="${
        process.env.PATHHEROKU || "http://localhost:3000"
      }auth/confirm/${user.tokenConfirm}">Vefica tu cuenta aqui.</a>`,
    });

    await user.save();

    req.flash("mensajes", [
      { msg: "Cuenta verificada, puedes iniciar sesion" },
    ]);
    return res.redirect("/auth/login");
  } catch (err) {
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/auth/login");
  }

  // res.json(token);
};

const loginUser = async (req, res) => {
  // Errores de la validacion hecha con express-validator.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Mensaje flash
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/login");
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("No existe este email");

    if (user.tokenConfirm) throw new Error("Falta confirmar cuenta");

    if (!(await user.comparePassword(password)))
      throw new Error("Contraseña no correcta");

    // Creacion de la sesion de usuario a traves de passport
    req.login(user, function (err) {
      if (err) throw new Error("Error al crear la sesion");
      return res.redirect("/");
    });
  } catch (err) {
    req.flash("mensajes", [{ msg: err.message }]);
    return res.redirect("/auth/login");
  }
};

const closeSession = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect("/auth/login");
  });
};

module.exports = {
  loginForm,
  registerForm,
  registerUser,
  confirmAccount,
  loginUser,
  closeSession,
};
