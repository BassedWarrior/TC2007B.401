import React from 'react';
import { useNavigate } from 'react-router-dom';
import SandersLogo from '../../../public/imagenes/NavBar/SandersLogo.jpeg'
import './../css/Barra.css';

const Barra = () => {
  const navigate = useNavigate();

  // Funciones para manejar la navegación
  const handleInicio = () => {
    navigate('/');
  };

  const handleNosotros = () => {
    navigate('/nosotros');
  };

  const handleProyectos = () => {
    navigate('/proyectos');
  };

  const handleDonar = () => {
    navigate('/donaciones');
  };

  return (
    <div className='NavBar'>
      <img src={SandersLogo} alt="Logo Sanders" className='LogoSanders' />

      <div className='botones'>
        <button className='boton' onClick={handleInicio}>INICIO</button>
        <button className='boton' onClick={handleNosotros}>NOSOTROS</button>
        <button className='boton' onClick={handleProyectos}>PROYECTOS</button>
      </div>

      <button className='boton donar' onClick={handleDonar}>DONAR AHORA</button>
    </div>
  );
};

export default Barra;
