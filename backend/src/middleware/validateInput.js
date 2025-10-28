// src/middleware/validateInput.js
import { body, validationResult } from "express-validator";

/**
 * VALIDACIÓN PARA REGISTER
 */
export const validateRegister = [
  body("nombre")
    .trim()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
    .escape(),

  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array().map((e) => e.msg).join(", "),
      });
    }
    next();
  },
];

/**
 * VALIDACIÓN PARA LOGIN
 */
export const validateLogin = [
  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),
  body("password").exists().withMessage("Contraseña requerida"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array().map((e) => e.msg).join(", "),
      });
    }
    next();
  },
];

/**
 * VALIDACIÓN PARA PRODUCTO (POST/PUT)
 */
export const validateProduct = [
  body("nombre")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .escape(),

  body("descripcion").optional().trim().escape(),

  body("precio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero >= 0"),

  body("categoria")
    .optional()
    .isMongoId()
    .withMessage("ID de categoría inválido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array().map((e) => e.msg).join(", "),
      });
    }
    next();
  },
];