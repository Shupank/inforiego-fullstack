import React, { useState, useRef } from "react";
import { sendForm } from "@emailjs/browser";
import "../styles/Contacto.css";

function Contacto() {
  const form = useRef();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    frecuencia: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", email: "", frecuencia: "", mensaje: "" });
    setFeedbackMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.frecuencia ||
      !formData.mensaje
    ) {
      setFeedbackMessage("Por favor, completá todos los campos obligatorios.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage("");
    setMessageType("");

    try {
      await sendForm(
        "service_7xtj2ic",
        "template_uw2hnj2",
        form.current,
        "7H54-U2J-VOaxsWGH"
      );

      setFeedbackMessage(
        "¡Gracias por tu mensaje! Nos pondremos en contacto pronto. 😊"
      );
      setMessageType("success");

      setTimeout(() => {
        resetForm();
      }, 4000);
    } catch (error) {
      console.error("Error al enviar el email:", error);
      setFeedbackMessage(
        "Hubo un error al enviar tu mensaje. Por favor, intentá de nuevo más tarde."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="contact-card" ref={form} onSubmit={handleSubmit}>
        <h2>Contactanos</h2>

        {/* Mensajes de retroalimentación para el usuario */}
        {feedbackMessage && (
          <div
            className={`form-message ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          aria-label="Nombre completo"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Correo electrónico"
        />
        <select
          name="frecuencia"
          value={formData.frecuencia}
          onChange={handleChange}
          required
          aria-label="Frecuencia de uso de riego"
        >
          <option value="" disabled>
            ¿Con qué frecuencia usás riego?
          </option>{" "}
          {/* Deshabilitado para que no sea una opción seleccionable */}
          <option value="nada">Nada</option>
          <option value="poco">Poco</option>
          <option value="mucho">Mucho</option>
        </select>
        <textarea
          name="mensaje"
          placeholder="Escribí tu consulta o comentario"
          value={formData.mensaje}
          onChange={handleChange}
          rows="5"
          required
          aria-label="Tu consulta o comentario"
        ></textarea>

        <div className="botones">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          <button type="button" onClick={resetForm} disabled={isSubmitting}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contacto;
