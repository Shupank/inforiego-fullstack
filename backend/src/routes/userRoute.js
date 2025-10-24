// src/routes/userRoute.js
import express from 'express';
import {
  register,
  login,
  getMe,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// RUTAS PÚBLICAS
router.post('/register', register);
router.post('/login', login);

// RUTAS PROTEGIDAS
router.get('/me', verifyToken, getMe);
router.get('/', verifyToken, admin, getUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, admin, deleteUser);

// ESTA LÍNEA ES LA CLAVE
export default router;