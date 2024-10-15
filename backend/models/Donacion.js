// Esquema de Donación.
// Denota una cantidad de dinero recibida por la fundación.

const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB.

const DonacionSchema = new mongoose.Schema(
    {
        // Tipo de donación. Medio por el cual fue recibida. Efectivo o digital.
        tipo: { type: String, required: true },
        // Monto recibido en la donación.
        monto: { type: String, required: true },
        // Fecha en que se realizó la donación.
        fecha: { type: Date, required: true },
        // Donador registrado que realizó la donación.
        donador: { type: mongoose.Schema.Types.ObjectId, ref: "Donador" },
    },
    // Evita guardado de valores no definidos en mongo
    { strict: true },
);

module.exports = mongoose.model("Donacion", DonacionSchema);
