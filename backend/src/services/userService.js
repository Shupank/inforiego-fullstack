import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const registerUser = async (data) => {
  const { email } = data;

  // Verificar si el email ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  // Crear usuario (el hash se hace en el pre-save hook del modelo)
  return await User.create(data);
};

// Login de usuario
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  // Generar JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email
    }
  };
};

// Obtener todos los usuarios (sin password)
export const getAllUsers = async () => {
  return await User.find().select('-password');
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

// Actualizar usuario
export const updateUser = async (id, data) => {
  // Si viene password, hashearla
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

// Eliminar usuario
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('Usuario no encontrado');
  return { message: 'Usuario eliminado correctamente' };
};