const {
  loginForm,
  registerForm,
  registerUser,
  confirmAccount,
  loginUser,
  closeSession,
} = require("../controlers/authController");

const express = require("express"),
  router = express.Router(),
  { body } = require("express-validator");

router.get("/register", registerForm);
router.post(
  "/register",
  [
    // Validaciones del body (backend).

    // - (el a capturar, validacion).(metodos)
    //  - trim(* borrar caracteres de los lados)
    //  - notEmpty(* no vacio)
    //  - escape(* escapar un script si es que se da uno)

    body("username", "Ingrese un nombre valido").trim().notEmpty().escape(),

    //  - isEmail(* validar si es email)
    //  - normalizeEmail(* normalizar email)
    body("email", "Ingrese un email valido")
      .trim()
      .isEmail()
      .normalizeEmail()
      .notEmpty(),

    //  - isLength(* longitud minima definida con un objeto y valor (revisa documentacion))
    //  - custom(* callback personalizado)
    body("password", "Contraseña de minimo seis caracteres")
      .trim()
      .isLength({ min: 6 })
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        } else {
          return value;
        }
      }),
  ],
  registerUser
);
router.get("/confirm/:token", confirmAccount);

router.get("/login", loginForm);

router.post(
  "/login",
  [
    body("email", "Ingrese un email valido")
      .trim()
      .isEmail()
      .normalizeEmail()
      .notEmpty(),
    body("password", "Contraseña minimo de seis caracteres")
      .trim()
      .isLength({ min: 6 })
      .escape(),
  ],
  loginUser
);

router.get("/logout", closeSession);

module.exports = router;
