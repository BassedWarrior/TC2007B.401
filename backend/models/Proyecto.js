// Esquema de Proyecto.
// Denota un proyecto que lleva a cabo o planea realizar la fundación.

const mongoose = require("mongoose");  // Módulo para interactuar con MongoDB.


const ProyectoSchema = new mongoose.Schema({
    // Nombre del proyecto.
    nombre: { type: String, required: true },
    // Descripción del proyecto. De qué trata el proyecto.
    descripcion: { type: String, required: true },
    // Fecha de inicio del proyecto.
    inicio: { type: Date, required: false },
    // Fecha de finalización del proyecto.
    fin: { type: Date, required: false },
    // Estado de realización del proyecto.
    estado: {
        type: String,
        enum: ['planeado', 'en progreso', 'completado', 'cancelado'],
        default: 'planeado',
        required: true
    },
    // Presupuesto asignado al proyecto.
    presupuesto: { type: Number, required: false },
    // Meta de presupuesto para poder llevar a cabo el proyecto.
    objetivo: { type: Number, required: false }
});


module.exports = mongoose.model("Proyecto", ProyectoSchema);
