// Esquema de Donador
// Denota una persona que realizó una donación a la fundación por algún medio.

const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB.

const DonadorSchema = new mongoose.Schema(
    {
        // Nombre de la persona que realizó la donación.
        nombre: { type: String, required: true },
        // Correo electrónico de la persona que realizó la donación.
        correo: {
            type: String,
            required: true,
            // check for valid email formats through characters
            match: [/.+@.+\..+/, "Invalid email format"],
        },
    },
    // Evita guardado de parámetros no definidos en mongo
    { strict: true },
);

module.exports = mongoose.model("Donador", DonadorSchema);
