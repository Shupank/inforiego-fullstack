import React, { useState } from "react";
import Card from "../components/Card";
import "../styles/Gallery.css";

import producto1 from "../assets/producto1.jpg";
import producto2 from "../assets/producto2.jpg";
import producto3 from "../assets/producto3.jpg";

const productos = [
  {
    imagen: producto1,
    titulo: "Enrollador",
    descripcion: "Ideal para campos deportivos.",
    precio: "$9.200.000",
  },
  {
    imagen: producto2,
    titulo: "Filtros",
    descripcion: "Para evitar el taponamiento de los emisores.",
    precio: "$250.000",
  },
  {
    imagen: producto3,
    titulo: "Avance frontal",
    descripcion: "Para el riego de grandes superficies.",
    precio: "$31.000.000",
  },
];

function Gallery() {
  const [filtro, setFiltro] = useState("");

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <section className="gallery">
      <h2>Productos</h2>

      {/* Input para buscar */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={filtro}
        onChange={handleFiltroChange}
        className="input-busqueda"
        aria-label="Buscar productos"
      />

      <div className="product-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto, index) => (
            <Card
              key={index}
              imagen={producto.imagen}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </section>
  );
}

export default Gallery;
