import React from 'react'
import "./../css/inicio.css"

import Captacion from '../../../public/imagenes/inicio/captacion.png'
import Cisternas from '../../../public/imagenesimagenes/inicio/cisternas.png'
import CuidarAgua from '../../../public/imagenesimagenes/inicio/cuidarAgua.jpg'


const Inicio = () => {
  return (

    
    <div className='body'>

      <div className='PrimeraParte'>
        <img src = {Captacion} alt="Captacion Agua" className='Captacion'></img>
        <div className='Creemos'>
          <h2>¿En qué creemos?</h2>
          <p>Que dotar de agua potable a comunidades de bajos recursos disminuye las barreras de acceso al bienestar y mitiga los factores de riesgo a la salud.</p>
        </div>
      </div>

      <div className='SegundaParte'>
        <img src = {Cisternas} alt="Cisterna de agua" className='Cisterna'></img>
        <div className='ComoHacemos'>
          <h2>¿Cómo lo hacemos?</h2>
          <p>Llevamos agua potable a todas las comunidades mediante sistemas de captación de agua pluvial y abasto de agua potable.</p>
        </div>
      </div>

      <div className='TerceraParte'>
      <img src = {CuidarAgua} alt="CuidarAgua" className='CuidarAgua'></img>
        <div className='PorQue'>
          <h2>¿Por qué lo hacemos?</h2>
          <p>Disponer de agua en cantidad y condiciones suficientes, y tener un impacto directo en la calidad de vida y el desarrollo social.</p>  
        </div>
      </div>


    </div>//main div
  )
}

export default Inicio;
