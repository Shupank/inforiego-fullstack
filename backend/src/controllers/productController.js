// src/controllers/productController.js
import * as productService from '../services/productService.js';

// ========================================
// GET /api/products
// ========================================
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      categoria,
      minPrice,
      maxPrice,
      search,
      sort = 'createdAt:desc'
    } = req.query;

    const filters = {};
    if (categoria) filters.categoria = categoria;
    if (minPrice || maxPrice) {
      filters.precio = {};
      if (minPrice) filters.precio.$gte = Number(minPrice);
      if (maxPrice) filters.precio.$lte = Number(maxPrice);
    }
    if (search) {
      filters.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } }
      ];
    }

    const [field, order] = sort.split(':');
    const sortObj = { [field]: order === 'asc' ? 1 : -1 };

    const result = await productService.getProductsPaginated({
      filters,
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortObj
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================================
// GET /api/products/:id
// ========================================
export const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ========================================
// POST /api/products
// ========================================
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ========================================
// PUT /api/products/:id
// ========================================
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ========================================
// DELETE /api/products/:id
// ========================================
export const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};