import React from "react";
import { motion } from "framer-motion";
import "../styles/SobreNosotros.css";

function SobreNosotros() {
  return (
    <motion.section
      className="sobre-nosotros"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3>Sobre Nosotros</h3>
      <p className="texto">
        Este es un espacio dedicado a mantenerte informado sobre las últimas
        novedades, tendencias y tecnologías relacionadas con el riego. Nuestro
        objetivo es proporcionar información actualizada y relevante, ya sea que
        estés interesado en sistemas de riego agrícola, jardines residenciales o
        soluciones sostenibles para la optimización del uso del agua. Descubrí
        consejos prácticos, innovaciones tecnológicas y noticias destacadas del
        sector, diseñadas para ayudarte a implementar métodos más eficientes y
        respetuosos con el medio ambiente.
      </p>
      <blockquote className="cita">
        “La innovación en riego no es solo técnica, es compromiso con la vida.
        ESE ES NUESTRO COMPROMISO PARA QUE TENGAS A TU ALCANCE TODA LA ACTUALIDAD.”
      </blockquote>
    </motion.section>
  );
}

export default SobreNosotros;
