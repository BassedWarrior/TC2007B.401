import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/Donaciones.css';

function Donaciones() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Imprimir el JSON en la consola del navegador
        console.log('Datos enviados:', data);

        try {
            // Primero, insertar el donador en la colección Donador
            const donadorResponse = await fetch('https://localhost:5001/api/donadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: data.nombre,
                    correo: data.correo
                })  // Solo enviar nombre y correo para Donador
            });

            if (donadorResponse.ok) {
                const donadorResult = await donadorResponse.json();
                console.log('Donador registrado:', donadorResult);

                // Después, insertar la donación en la colección Donacion
                const donacionData = {
                    tipo: "digital",  // Tipo de donación siempre es "digital"
                    monto: data.monto,  // Monto recibido
                    fecha: new Date(),  // Fecha actual
                    donador: donadorResult._id  // ID del donador registrado
                };

                const donacionResponse = await fetch('https://localhost:5001/api/donaciones', {  // Actualizar URL a la ruta de donaciones
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donacionData)  // Enviar los datos de la donación
                });

                if (donacionResponse.ok) {
                    const donacionResult = await donacionResponse.json();
                    console.log('Donación exitosa:', donacionResult);
                    // Aquí puedes agregar una lógica para manejar el éxito de la donación
                } else {
                    console.error('Error en la donación:', await donacionResponse.text());
                }
            } else {
                console.error('Error en el registro del donador:', await donadorResponse.text());
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
