// src/routes/authRoutes.js
import express from "express";
import authController from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateInput.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar usuario + enviar email de verificación
 * @access  Público
 */
router.post("/register", validateRegister, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login → devuelve JWT
 * @access  Público
 */
router.post("/login", validateLogin, authController.login);

/**
 * @route   GET /api/auth/verify/:token
 * @desc    Verificar email con token
 * @access  Público
 */
router.get("/verify/:token", authController.verifyEmail);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Reenviar email de verificación
 * @access  Público
 */
router.post("/resend-verification", authController.resendVerification);

export default router;