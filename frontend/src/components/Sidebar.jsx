import React from "react";
import publicidadImg from "../assets/publicidad.jpg";


function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="ad-banner">
        <a
          href="https://www.agronorte.com.ar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={publicidadImg}
            alt="Banner Publicitario - ¡Haz clic aquí!"
          />
        </a>
      </div>
      
    </aside>
  );
}

export default Sidebar;
