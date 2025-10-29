// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componentes
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Products from './pages/Products';
import ProductForm from './components/ProductForm';
import AdminPanel from './components/AdminPanel';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20 text-xl">Cargando...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20 text-xl">Cargando...</div>;
  return user && user.role === 'admin' ? children : <Navigate to="/products" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="min-h