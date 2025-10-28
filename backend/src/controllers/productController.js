// src/controllers/productController.js
import productService from "../services/productService.js";

/**
 * GET /api/products
 * Listar productos del usuario autenticado (con filtros, paginación, etc.)
 */
export const getProducts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      page = 1,
      limit = 10,
      categoria,
      minPrice,
      maxPrice,
      search,
      sort = "createdAt:desc",
    } = req.query;

    const filters = { user: userId }; // ← CLAVE: solo productos del usuario

    if (categoria) filters.categoria = categoria;
    if (minPrice || maxPrice) {
      filters.precio = {};
      if (minPrice) filters.precio.$gte = Number(minPrice);
      if (maxPrice) filters.precio.$lte = Number(maxPrice);
    }
    if (search) {
      filters.$or = [
        { nombre: { $regex: search, $options: "i" } },
        { descripcion: { $regex: search, $options: "i" } },
      ];
    }

    const [field, order] = sort.split(":");
    const sortObj = { [field]: order === "asc" ? 1 : -1 };

    const result = await productService.getProductsPaginated({
      filters,
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortObj,
    });

    res.json(result);
  } catch (err) {
    next(err); // → errorHandler
  }
};

/**
 * GET /api/products/:id
 * Detalle de producto (solo si es del usuario)
 */
export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getByIdAndUser(
      req.params.id,
      req.user.id
    );
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/products
 * Crear producto
 */
export const createProduct = async (req, res, next) => {
  try {
    const productData = {
      ...req.body,
      user: req.user.id,
    };
    const product = await productService.create(productData);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/products/:id
 * Actualizar producto (solo si es del usuario)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateByIdAndUser(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/products/:id
 * Eliminar producto (solo si es del usuario)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteByIdAndUser(
      req.params.id,
      req.user.id
    );
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
};