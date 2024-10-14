import React from 'react';

import useSWR,{mutate} from 'swr';
import { useForm } from 'react-hook-form';

import '../css/Donaciones.css';





const Donaciones = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
    const onSubmit = handleSubmit((data) => { console.log(data); });

    return (
        <div className='Pagina'>
            {/* Contenedor para las líneas animadas */}
            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            {/* Formulario de donaciones */}
            <form onSubmit={onSubmit}>
                <label htmlFor='nombre'>Nombre: </label>
                <input type='text' {...register("nombre", { required: true })} />
                {errors.nombre && <span>Nombre es requerido</span>}

                <label htmlFor='correo'>Correo electrónico: </label>
                <input type='email' {...register("correo", { required: true })} />
                {errors.correo && <span>Correo electrónico es requerido</span>}

                <label htmlFor='monto'>Monto a donar: </label>
                <input type='number' {...register("monto",{required:true, min:1})} />

                <div className="checkbox-container">
                    <input type='checkbox' id='terminos' {...register("terminos", { required: true })} />
                    <label htmlFor='terminos'>Acepto términos y condiciones</label>
                    {errors.terminos && <span>Debes aceptar los términos y condiciones</span>}
                </div>

                <button type='submit'>Donar</button>
            </form>
        </div>
    );
};

export default Donaciones;