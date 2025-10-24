// src/services/productService.js
import Product from '../models/productModel.js';

// ========================================
// GET ALL + FILTROS + PAGINACIÓN + ORDEN
// ========================================
export const getProductsPaginated = async ({ filters, page, limit, sort }) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filters)
      .populate('categoria', 'nombre')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Product.countDocuments(filters)
  ]);

  const pages = Math.ceil(total / limit);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1
    }
  };
};

// ========================================
// GET BY ID
// ========================================
export const getProductById = async (id) => {
  const product = await Product.findById(id).populate('categoria', 'nombre');
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

// ========================================
// CREATE
// ========================================
export const createProduct = async (data) => {
  const { nombre, precio, stock, categoria } = data;

  if (!nombre || !precio || !stock || !categoria) {
    throw new Error('Faltan campos obligatorios: nombre, precio, stock, categoria');
  }

  return await Product.create(data);
};

// ========================================
// UPDATE
// ========================================
export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate('categoria', 'nombre');

  if (!product) throw new Error('Producto no encontrado');
  return product;
};

// ========================================
// DELETE
// ========================================
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Producto no encontrado');
  return { message: 'Producto eliminado correctamente' };
};