
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Novedades from "./pages/Novedades";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
