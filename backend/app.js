import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoute.js';
import categoryRoutes from './src/routes/categoryRoute.js';
import userRoutes from './src/routes/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes); // AÑADIDO

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Inforiego funcionando');
});

// Iniciar servidor + DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});