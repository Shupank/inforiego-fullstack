// src/utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * GENERAR TOKEN JWT
 * @param {Object} payload - Datos a incluir (ej: { userId, role })
 * @param {string} expiresIn - Tiempo de expiración (ej: "1d", "1h")
 * @returns {string} token
 */
const generateToken = (payload, expiresIn = "1d") => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en .env");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * VERIFICAR TOKEN JWT
 * @param {string} token - Token Bearer
 * @returns {Object} payload decodificado
 * @throws Error si token inválido o expirado
 */
const verifyToken = (token) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en .env");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error("Token expirado");
      error.status = 401;
      throw error;
    }
    if (err.name === "JsonWebTokenError") {
      const error = new Error("Token inválido");
      error.status = 401;
      throw error;
    }
    throw err;
  }
};

export { generateToken, verifyToken };