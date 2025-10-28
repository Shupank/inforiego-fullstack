// src/models/categoryModel.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [200, "La descripción no puede exceder 200 caracteres"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "La categoría debe pertenecer a un usuario"],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas rápidas
categorySchema.index({ user: 1 });
categorySchema.index({ user: 1, nombre: 1 }, { unique: true }); // Evita duplicados por usuario

// No devolver campos innecesarios
categorySchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  return category;
};

const Category = mongoose.model("Category", categorySchema);

export default Category;