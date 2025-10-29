import React from "react";
import Hero from "../components/Hero";
import SobreNosotros from "../components/SobreNosotros";
import Articulo from "../components/Articulo";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";
import "../styles/Sidebar.css";

function Home() {
  return (
    <>
      <Hero />

      <div className="contenedor-principal">
        {/* Columna Izquierda: Contenido */}
        <div className="contenido">
          <SobreNosotros />
          <Articulo />
        </div>

        {/* Columna Derecha: Publicidad */}
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
