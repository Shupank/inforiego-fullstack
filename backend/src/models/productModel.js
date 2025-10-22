import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
