import React from 'react';

import "../css/PieAbajo.css"

const PieAbajo = () => {
  return (
    <div className='PieAbajo'>

        <div className='Direccion'>
            <p><strong>Dirección:</strong> Melchor Ocampo 193, Torre A, Piso 1, CP 11300 Col. Verónica Anzures</p>
        </div>

        <div className='Telefono'>
            <p><strong>Teléfono:</strong> 55 52 08 11 11</p>
        </div>

        <div className='Correo'>
            <p>
                <strong>Correo:</strong> 
                <a href="mailto:contacto@sanders.com.mx" className='CorreoLink'> contacto@sanders.com.mx</a>
            </p>
        </div>

    </div>
  )
}

export default PieAbajo;
