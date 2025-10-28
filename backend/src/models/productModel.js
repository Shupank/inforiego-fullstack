// src/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // required: false → permite productos sin categoría
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El producto debe pertenecer a un usuario"],
    },
  },
  { timestamps: true }
);

// Índice para consultas por usuario (listado personal)
productSchema.index({ user: 1 });
productSchema.index({ user: 1, categoria: 1 });

// No devolver campos innecesarios
productSchema.methods.toJSON = function () {
  const product = this.toObject();
  delete product.__v;
  return product;
};

const Product = mongoose.model("Product", productSchema);

export default Product;