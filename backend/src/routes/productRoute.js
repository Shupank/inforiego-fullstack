// src/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateProduct } from "../middleware/validateInput.js";

const router = express.Router();

// === PROTEGER RUTAS SENSIBLES CON JWT ===
router.use(authMiddleware); // ← TODAS las rutas requieren token

// === VALIDACIÓN DE INPUT (POST/PUT) ===
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);

// === CRUD COMPLETO (protegido) ===
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;