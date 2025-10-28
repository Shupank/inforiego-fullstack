// src/utils/email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configuración del transporter (Gmail, Outlook, etc.)
 * Usa variables de entorno → NO hardcodear credenciales
 */
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail", // o "hotmail", "yahoo", etc.
    auth: {
      user: process.env.EMAIL_USER,     // tuemail@gmail.com
      pass: process.env.EMAIL_PASS,     // App Password (NO contraseña normal)
    },
  });
};

/**
 * Enviar email de verificación
 * @param {string} to - Email del usuario
 * @param {string} token - JWT de verificación
 */
const sendVerificationEmail = async (to, token) => {
  const transporter = createTransporter();

  // URL del frontend (cambia según tu despliegue)
  const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email/${token}`;

  const mailOptions = {
    from: `"InfoRiego App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifica tu cuenta - InfoRiego",
    text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50;">¡Bienvenido a InfoRiego!</h2>
        <p>Para activar tu cuenta, haz clic en el botón:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; background: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verificar mi cuenta
        </a>
        <p style="margin-top: 20px; color: #7f8c8d; font-size: 0.9em;">
          Si no solicitaste esta cuenta, ignora este mensaje.
        </p>
        <hr>
        <p style="font-size: 0.8em; color: #95a5a6;">
          Enlace válido por 1 hora.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email de verificación enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error al enviar email:", error);
    const err = new Error("No se pudo enviar el email de verificación");
    err.status = 500;
    throw err;
  }
};

export { sendVerificationEmail };