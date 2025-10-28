// src/middleware/errorHandler.js

/**
 * MIDDLEWARE CENTRALIZADO DE ERRORES
 * 
 * - Captura cualquier error pasado con next(err)
 * - Formatea respuesta JSON consistente
 * - Oculta stack en producción
 * - Maneja errores comunes (MongoDB, JWT, Validación)
 */
const errorHandler = (err, req, res, next) => {
  // 1. Determinar código de estado
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  // 2. Errores de MongoDB
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "ID inválido";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  if (err.code === 11000) {
    // Duplicado (ej: email único)
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} ya está en uso`;
  }

  // 3. Errores de JWT (lanzados desde jwt.js)
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Sesión expirada";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token inválido";
  }

  // 4. En producción: ocultar stack trace
  const isProduction = process.env.NODE_ENV === "production";
  const errorResponse = {
    error: message,
    ...(isProduction ? null : { stack: err.stack }), // solo en dev
  };

  // 5. Log del error (opcional, para desarrollo)
  if (!isProduction) {
    console.error("ERROR:", err);
  }

  // 6. Respuesta final
  res.status(statusCode).json(errorResponse);
};

export default errorHandler;