import React from "react";
import Gallery from "../components/Gallery";

import "../styles/Productos.css";

function Productos() {
  return (
    <div className="productos-page">
      {" "}
      {/* Contenedor principal de la página */}
      <header className="productos-header">
        <h1>Recomendaciones de productos</h1>
        <p>
          Explora nuestras recomendaciones para satisfacer todas tus
          necesidades, desde agricultura a gran escala hasta jardinería
          doméstica.
        </p>
      </header>
      {/* Aquí renderizamos el componente Gallery que ya creaste */}
      <Gallery />
    </div>
  );
}

export default Productos;
