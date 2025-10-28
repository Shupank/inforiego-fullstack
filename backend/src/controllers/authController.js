// src/controllers/authController.js
import authService from "../services/authService.js";

/**
 * POST /api/auth/register
 * Registro de usuario + envío de email de verificación
 */
const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación básica (express-validator en middleware, pero por si acaso)
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const result = await authService.register({ nombre, email, password });
    res.status(201).json(result);
  } catch (err) {
    next(err); // → errorHandler global
  }
};

/**
 * POST /api/auth/login
 * Login → devuelve JWT
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/verify/:token
 * Verificar email con token
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ error: "Token requerido" });
    }

    const result = await authService.verifyEmail(token);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/resend-verification
 * Reenviar email de verificación
 */
const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email es obligatorio" });
    }

    const result = await authService.resendVerificationEmail(email);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  verifyEmail,
  resendVerification,
};