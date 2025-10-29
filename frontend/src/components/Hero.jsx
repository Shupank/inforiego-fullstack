import React from "react";
import "../styles/Hero.css";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section
      className="hero-container"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-texto">
        <h1>Bienvenidos a Inforiego</h1>
      </div>
    </section>
  );
}

export default Hero;
