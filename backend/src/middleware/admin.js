// src/middleware/admin.js
const admin = (req, res, next) => {
  // Verifica que el usuario exista y tenga rol 'admin'
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Acceso denegado: se requiere rol de administrador'
    });
  }
  next();
};

export default admin;