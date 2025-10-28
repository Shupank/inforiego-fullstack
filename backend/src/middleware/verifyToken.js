// src/middleware/verifyToken.js
import { verifyToken } from "../utils/jwt.js";
import userRepository from "../repositories/userRepository.js";

/**
 * MIDDLEWARE: Verificar JWT + cargar usuario
 * - Usa verifyToken() de utils/jwt.js
 * - Busca usuario en repository
 * - Agrega req.user (sin password)
 */
const verifyTokenMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token no proporcionado");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    // 1. Verificar token
    const payload = verifyToken(token); // ← usa utils/jwt.js

    // 2. Buscar usuario (sin password)
    const user = await userRepository.getById(payload.userId);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.status = 401;
      return next(error);
    }

    // 3. Agregar al request
    req.user = {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    err.status = err.status || 401;
    next(err);
  }
};

export default verifyTokenMiddleware;