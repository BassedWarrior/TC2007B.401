// Controladores de recurso de administradores en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de administrador de la base de datos.
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs"); // Utilizada para el encriptado de las contraseñas.
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
// Funcion para sanitizar la entrada
const sanitizeInput = (input) => mongoSanitize(input);

// Obtener todos los administradores
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        const adminsWithId = admins.map((admin) => ({
            id: admin._id,
            usuario: admin.usuario,
            correo: admin.correo,
            nombre: admin.nombre,
            rol: admin.rol,
        }));
        res.set("X-Total-Count", admins.length);
        res.json(adminsWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los administradores" });
    }
};

// Obtener un solo administrador por su ID
exports.getAdminById = async (req, res) => {
    const { id } = sanitizeInput(req.params);
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res
                .status(404)
                .json({ error: "Administrador no encontrado" });
        }
        const adminWithId = {
            id: admin._id,
            usuario: admin.usuario,
            correo: admin.correo,
            nombre: admin.nombre,
            rol: admin.rol,
        };
        res.json(adminWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener el administrador" });
    }
};

// Crear un nuevo administrador
exports.createAdmin = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const { usuario, contrasena, correo, nombre, apellido, rol } =
            sanitizedBody;

        const Hashcontrasena = await bcrypt.hash(contrasena, 10);

        const newAdmin = new Admin({
            usuario,
            contrasena: Hashcontrasena,
            correo,
            nombre,
            apellido,
            rol,
        });

        await newAdmin.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
        console.log("Administrador registrado con éxito");
        console.log("Usuario: ", usuario);
        console.log("Contraseña Hasheada: ", Hashcontrasena);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

// Actualizar un administrador por su ID
exports.updateAdminById = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);

        if (sanitizedBody.contrasena) {
            const hashedPassword = await bcrypt.hash(
                sanitizedBody.contrasena,
                10,
            );
            sanitizedBody.contrasena = hashedPassword;
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            sanitizedBody,
            { new: true },
        );
        if (!updatedAdmin)
            return res
                .status(404)
                .json({ error: "Administrador no encontrado" });
        res.json({
            id: updatedAdmin._id,
            usuario: updatedAdmin.usuario,
            contrasena: updatedAdmin.contrasena,
            correo: updatedAdmin.correo,
            nombre: updatedAdmin.nombre,
            rol: updatedAdmin.rol,
        });
    } catch (err) {
        res.status(500).json({
            error: "Error al actualizar los datos del administrador",
        });
    }
};

exports.deleteAdminById = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

        if (!deletedAdmin)
            return res
                .status(404)
                .json({ error: "Administrador no encontrado" });

        res.json({
            message: "Administrador eliminado con éxito",
            id: deletedAdmin._id,
            usuario: deletedAdmin.usuario,
            correo: deletedAdmin.correo,
            nombre: deletedAdmin.nombre,
            rol: deletedAdmin.rol,
        });
    } catch (err) {
        res.status(500).json({
            error: "Error al eliminar el administrador",
        });
    }
};
