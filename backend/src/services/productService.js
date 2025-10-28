// src/services/productService.js
import productRepository from "../repositories/productRepository.js";

/**
 * GET ALL + FILTROS + PAGINACIÓN + ORDEN
 * Solo productos del usuario autenticado
 */
export const getProductsPaginated = async ({ filters, page, limit, sort, userId }) => {
  // FORZAR filtro por usuario
  const userFilters = { ...filters, user: userId };

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    productRepository.getPaginated(userFilters, skip, limit, sort),
    productRepository.count(userFilters),
  ]);

  const pages = Math.ceil(total / limit);

  return {
    products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    },
  };
};

/**
 * GET BY ID + OWNERSHIP
 */
export const getByIdAndUser = async (id, userId) => {
  const product = await productRepository.getByIdAndUser(id, userId);
  if (!product) {
    const error = new Error("Producto no encontrado o no autorizado");
    error.status = 404;
    throw error;
  }
  return product;
};

/**
 * CREATE
 * Validación en middleware → aquí solo lógica
 */
export const create = async (productData, userId) => {
  const data = { ...productData, user: userId };
  return await productRepository.create(data);
};

/**
 * UPDATE + OWNERSHIP
 */
export const updateByIdAndUser = async (id, userId, updateData) => {
  const product = await productRepository.updateByIdAndUser(id, userId, updateData);
  if (!product) {
    const error = new Error("Producto no encontrado o no autorizado");
    error.status = 404;
    throw error;
  }
  return product;
};

/**
 * DELETE + OWNERSHIP
 */
export const deleteByIdAndUser = async (id, userId) => {
  const product = await productRepository.deleteByIdAndUser(id, userId);
  if (!product) {
    const error = new Error("Producto no encontrado o no autorizado");
    error.status = 404;
    throw error;
  }
  return { message: "Producto eliminado correctamente" };
};