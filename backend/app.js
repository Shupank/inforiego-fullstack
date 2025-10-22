import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoute.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/products", productRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor Inforiego funcionando 🚀");
});

// Puerto
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
