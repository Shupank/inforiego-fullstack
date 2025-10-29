import React, { useState } from 'react';

function Card({ imagen, titulo, descripcion, precio }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <>
      <div
        className="card"
        onClick={abrirModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') abrirModal();
        }}
        style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
      >
        <img
          src={imagen}
          alt={`Imagen de ${titulo}`}
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <p style={{ fontWeight: 'bold', color: '#0a8c5f' }}>Precio: {precio}</p>
      </div>

      {mostrarModal && (
        <div
          onClick={cerrarModal}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              color: '#333',
            }}
          >
            <h2>{titulo}</h2>
            <img
              src={imagen}
              alt={`Imagen de ${titulo}`}
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
            />
            <p>{descripcion}</p>
            <p style={{ fontWeight: 'bold', color: '#0a8c5f', marginTop: '1rem' }}>Precio: {precio}</p>
            <button
              onClick={cerrarModal}
              style={{
                marginTop: '1.5rem',
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#0a8c5f',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              aria-label="Cerrar modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
