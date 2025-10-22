import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("Servidor Inforiego funcionando 🚀");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error en MongoDB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
