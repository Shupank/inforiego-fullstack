// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <div className="logo-container">
        <NavLink to="/products">
          <img src={logo} alt="Logo" style={{ width: "200px", height: "auto" }} />
        </NavLink>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`navbar-links ${menuAbierto ? "abierto" : ""}`}>
        <NavLink to="/products" className="nav-link" onClick={() => setMenuAbierto(false)}>
          Productos
        </NavLink>

        {user ? (
          <>
            <NavLink to="/products/new" className="nav-link" onClick={() => setMenuAbierto(false)}>
              + Nuevo
            </NavLink>

            {user.role === "admin" && (
              <NavLink to="/admin" className="nav-link admin-link" onClick={() => setMenuAbierto(false)}>
                Admin
              </NavLink>
            )}

            <span className="user-name">Hola, {user.nombre}</span>

            <button onClick={handleLogout} className="logout-btn">
              Salir
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link" onClick={() => setMenuAbierto(false)}>
              Login
            </NavLink>
            <NavLink to="/register" className="nav-link" onClick={() => setMenuAbierto(false)}>
              Registrarse
            </NavLink>
          </>
        )}
      </nav>

      <form action="/search" method="GET" className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="q" placeholder="Buscar productos..." />
        <button type="submit">Buscar</button>
      </form>
    </header>
  );
}

export default Navbar;