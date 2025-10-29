import React from "react";

import "../styles/Novedades.css";

import novedadesImg from "../assets/novedades.jpg";

function Novedades() {
  return (
    <div className="page-container">
      <main className="content">
        <section className="noticia-principal">
          <img src={novedadesImg} alt="noticia" className="imagen-noticia" />
          <div className="contenido-noticia">
            <h1>
              “Un milagro” en las zonas áridas de Catamarca: en Santa María, el
              riego fortalece a la papa y el tomate
            </h1>
            <p>
              En la AER Santa María del INTA asesoran a productores
              catamarqueños en el diseño de una tecnología que permite
              sistematizar las parcelas y contribuir al uso eficiente del agua,
              mediante la instalación de riego presurizado en cultivos de
              hortalizas. La agricultura del departamento Santa María, en la
              provincia de Catamarca, se caracteriza por ser bajo riego, debido
              a su ambiente árido. El recurso hídrico puede ser abastecido desde
              dos fuentes, el agua superficial y el agua subterránea. En esa
              línea, para potenciar el abastecimiento, un equipo de técnicos de
              la Agencia de Extensión Rural Santa María acompaña a los
              productores con el asesoramiento del diseño agronómico e
              hidráulico para la sistematización de las parcelas y el uso
              eficiente del agua de riego. Flavio Sosa, uno de los técnicos de
              esta Agencia de Extensión Rural, detalló que el agua subterránea
              se extrae con bombeo, haciendo uso de energías renovables solar.
              “La perforación de uso eroga un caudal de 70 metros cúbicos por
              hora y permite un rendimiento efectivo de 6 horas diarias de
              funcionamiento”, describió el investigador.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Novedades;
