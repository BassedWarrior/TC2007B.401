import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/Donaciones.css'

function Donaciones() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Imprimir el JSON en la consola del navegador
        console.log('Datos enviados:', data);

        try {
            const response = await fetch('https://localhost:5001/api/donarahora', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)  // Convertir el objeto de datos a JSON
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Donación exitosa:', result);
            } else {
                console.error('Error en la donación');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nombre:
                <input type="text" {...register('nombre', { required: true })} />
                {errors.nombre && <span>Este campo es requerido</span>}
            </label>

            <label>
                Correo:
                <input type="email" {...register('correo', { required: true })} />
                {errors.correo && <span>Este campo es requerido</span>}
            </label>

            <label>
                Monto:
                <input type="number" {...register('monto', { required: true, min: 1 })} />
                {errors.monto && <span>El monto debe ser mayor que 0</span>}
            </label>

            <button type="submit">Donar</button>
        </form>
    );
}

export default Donaciones;
