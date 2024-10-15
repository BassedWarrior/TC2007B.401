// Esquema de Admin
// Denota un usuario de administración de la fundación con acceso al CRM.

const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB.

const AdminSchema = new mongoose.Schema(
    {
        // Nombre de usuario para login.
        usuario: { type: String, required: true },
        // Contraseña de administrador para login.
        contrasena: { type: String, required: true },
        // Correo electrónico del administrador
        correo: { type: String, required: true },
        // Nombre completo del administrador
        nombre: { type: String, required: true },
        // Rol en el sistema del administrador
        rol: {
            type: String,
            required: true,
            enum: ["administrador", "empleado"],
        },
    },
    // Evita el guardado de parametros no especificados
    { strict: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
