import React from 'react'

import "../css/Nosotros.css"

import Guillermo from '../../../public/imagenes/Nosotros/GuillermoSandersAcedo.png'
import Agua from '../../../public/imagenes/Nosotros/llevamosAgua.png'

const Nosotros = () => {
  return (
    <div className="Nosotros">



      <div className='Parrafos'>
        <div className='Objetivo'>
          <h2>Objetivo</h2>
          <p>Desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.</p>
        </div>

        <div className='Mision'>
          <h2>Misión</h2>
          <p>Fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a la malnutrición y al consumo de agua contaminada.</p>
        </div>

        <div className='Vision'>
          <h2>Visión</h2>
          <p>Fundación Sanders A.C. es un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.</p>
        </div>
      </div>


      <div className='Agua'>
        <img src={Agua} alt="imagenLlevamos" className='llevamosAgua'></img>
      </div>



      <div className='Guillermo'>
        <div className="imagenContenedor">
          <img src={Guillermo} alt='FotoGuillermo' className='Retrato'></img>
        </div>
        <div className='fundacion'>
          <p className='primero'>
            <strong>Fundación Sanders A.C.</strong>, es una Asociación Civil sin fines de lucro creada en el año 2016 
            por iniciativa del empresario mexicano Guillermo Sanders Acedo (1935-2019), 
            para contribuir a la mejora de la calidad de vida en grupos sociales en situación de vulnerabilidad, 
            mediante la promoción de la salud sexual y reproductiva, la nutrición comunitaria y el abastecimiento de agua.
          </p>
          
          <p className='segundo'>
            <strong>Fundación Sanders A.C.</strong> es un referente por su modelo de intervención preventiva convencidos de que para llegar
            a la raíz de los problemas, hay que atacarlos desde el ángulo de la prevención y el desarrollo de herramientas 
            sociales para la toma de decisiones.
          </p>
        </div>
      </div>


    </div>
  )
}

export default Nosotros
