// src/services/authService.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/email.js";

/**
 * REGISTRO DE USUARIO
 * - Valida que no exista email
 * - Hashea contraseña (ya en model, pero doble check)
 * - Genera token de verificación (1h)
 * - Envía email
 */
const register = async ({ nombre, email, password }) => {
  // 1. Verificar si el email ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("El email ya está registrado");
    error.status = 400;
    throw error;
  }

  // 2. Crear usuario (el hash se hace en pre-save del model)
  const user = await User.create({
    nombre,
    email,
    password,
  });

  // 3. Generar token de verificación (1 hora)
  const verificationToken = generateToken(
    { userId: user._id, type: "verification" },
    "1h"
  );

  // 4. Enviar email
  await sendVerificationEmail(email, verificationToken);

  return {
    message: "Usuario registrado. Revisa tu email para verificar tu cuenta.",
    user: user.toJSON(), // sin password
  };
};

/**
 * LOGIN DE USUARIO
 * - Busca por email
 * - Verifica contraseña
 * - Verifica que esté verificado
 * - Devuelve JWT (1 día)
 */
const login = async ({ email, password }) => {
  // 1. Buscar usuario
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  // 2. Verificar contraseña
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  // 3. Verificar que el email esté verificado
  if (!user.verified) {
    const error = new Error("Debes verificar tu email antes de iniciar sesión");
    error.status = 403;
    throw error;
  }

  // 4. Generar JWT de sesión
  const token = generateToken({ userId: user._id, role: user.role }, "1d");

  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    },
  };
};

/**
 * VERIFICACIÓN DE EMAIL
 * - Recibe token
 * - Verifica JWT
 * - Marca usuario como verified
 */
const verifyEmail = async (token) => {
  try {
    // 1. Verificar token
    const payload = verifyToken(token);
    if (payload.type !== "verification") {
      const error = new Error("Token inválido");
      error.status = 400;
      throw error;
    }

    // 2. Buscar y actualizar usuario
    const user = await User.findByIdAndUpdate(
      payload.userId,
      { verified: true },
      { new: true }
    );

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }

    return { message: "Email verificado con éxito" };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error("El enlace ha expirado");
      error.status = 400;
      throw error;
    }
    throw err;
  }
};

/**
 * REENVIAR EMAIL DE VERIFICACIÓN
 */
const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Email no encontrado");
    error.status = 404;
    throw error;
  }

  if (user.verified) {
    const error = new Error("El email ya está verificado");
    error.status = 400;
    throw error;
  }

  const verificationToken = generateToken(
    { userId: user._id, type: "verification" },
    "1h"
  );

  await sendVerificationEmail(email, verificationToken);

  return { message: "Email de verificación reenviado" };
};

export default {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
};