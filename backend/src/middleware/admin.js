// src/middleware/admin.js
/**
 * MIDDLEWARE: Solo administradores
 * - Verifica que exista req.user (gracias a authMiddleware)
 * - Verifica que role === 'admin'
 */
const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Acceso denegado: autenticación requerida",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Acceso denegado: se requiere rol de administrador",
    });
  }

  next();
};

export default admin;