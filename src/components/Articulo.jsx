import React from "react";
import { motion } from "framer-motion";
import expo1 from "../assets/expoagro.png";
import expo2 from "../assets/expoagro2.jpg";
import "../styles/Articulo.css";

function Articulo() {
  return (
    <motion.section
      className="articulo"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h4>Qué nos dejó Expoagro</h4>
      <p className="texto">
        Expoagro es la megamuestra agrícola más importante de la región, un
        punto de encuentro clave para la innovación y el futuro del agro. Se
        celebra cada año en el predio ferial y autódromo de San Nicolás (Buenos
        Aires) y reúne a cientos de empresas que presentan sus últimas
        soluciones para el sector. En esta edición, participaron alrededor de
        700 empresas, consolidando a Expoagro como el epicentro de la tecnología
        y los negocios agrícolas. Desde hace 30 años, Autologica acompaña el
        progreso de esta industria aportando la solución que facilita la
        operatoria diaria de las concesionarias, aliado principal del productor
        agrícola. Participar en Expoagro edición YPF Agro 2025 fue una instancia
        clave en la cual pudimos mostrar en acción nuestras soluciones
        tecnológicas, haciendo foco en los puntos que buscan resolver los
        gerentes de concesionaria, en cada sector y departamento del negocio.
        Además, fue la oportunidad para presentar AVA, la IA de Autologica que
        jugará un rol clave en la rutina de cada concesionario. Sabemos que
        gestionar una concesionaria agrícola no es tarea fácil; las exigencias
        del sector son complejas y las herramientas deben estar a la altura. Por
        eso, lo que comenzó como un DMS pensado para cubrir la operatoria de
        todos los departamentos de la concesionaria, hoy se ha convertido en una
        solución que resuelve lo operativo, reduce demoras, simplifica tareas,
        potencia lo estratégico y, además, ahora incluye IA para facilitar la
        toma de decisiones.
      </p>
      <div className="contenedor-de-imagenes">
        <img src={expo1} alt="Expoagro 1" />
        <img src={expo2} alt="Expoagro 2" />
      </div>
    </motion.section>
  );
}

export default Articulo;
