import React from 'react';
import './../css/Donaciones.css';

const Donaciones = () => {
  return (
    <div className='Pagina'>

        <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>


        <div className='Formulario'>
            <form>
                <label htmlFor='nombre'> Nombre: </label>
                <input type='text'/>

                <label htmlFor='correo'>Correo electrónico: </label>
                <input type='email'/>

                <label htmlFor='cantidad'>Monto a donar: </label>
                <input type='number'/>

                <div className="checkbox-container">
                    <input type='checkbox' id='terminos'/>
                    <label htmlFor='terminos'>Acepto términos y condiciones</label>
                </div>

                <button>Donar</button>
            </form>
        </div>
    </div>
  );
};

export default Donaciones;
