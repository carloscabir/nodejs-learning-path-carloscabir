import express from "express";
import { login, register } from "../controllers/authController.js";
import { body } from "express-validator";
const router = express.Router();

// (POST)
router.post(
  "/api/v1/login",
  [
    body("email", "Formato de Email Incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  login
);

router.post("/api/v1//register", register);

export default router;
