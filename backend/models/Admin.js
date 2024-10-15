// Esquema de Admin
// Denota un usuario de administración de la fundación con acceso al CRM.

const mongoose = require("mongoose");  // Módulo para interactuar con MongoDB.


const AdminSchema = new mongoose.Schema({
    // Nombre de usuario para login.
    usuario: { type: String, required: true },
    // Contraseña de usuario para login.
    contrasena: { type: String, required: true }
});


module.exports = mongoose.model("Admin", AdminSchema);
