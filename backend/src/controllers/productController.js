import Product from "../models/productModel.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoria");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener producto por ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoria");
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
