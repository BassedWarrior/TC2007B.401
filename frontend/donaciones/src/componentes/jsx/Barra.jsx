import React from 'react';
import { useNavigate } from 'react-router-dom';

const Barra = () => {
  const navigate = useNavigate();

  // Funciones para manejar la navegación
  const handleInicio = () => {
    navigate('/inicio');
  };

  const handleNosotros = () => {
    navigate('/nosotros');
  };

  const handleProyectos = () => {
    navigate('/proyectos');
  };

  return (
    <div>
      <button onClick={handleInicio}>INICIO</button>
      <button onClick={handleNosotros}>NOSOTROS</button>
      <button onClick={handleProyectos}>PROYECTOS</button>
    </div>
  );
};

export default Barra;
