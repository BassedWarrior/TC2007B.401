// Controladores de recurso de donadores en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de donador de la base de datos.
const Donador = require("../models/Donador");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
// Funcion para sanitizar la entrada
const sanitizeInput = (input) => mongoSanitize(input);

// Obtener todas las donadores
exports.getAllDonadores = async (req, res) => {
    try {
        const donadores = await Donador.find();
        const donadoresWithId = donadores.map((donador) => ({
            id: donador._id,
            nombre: donador.nombre,
            correo: donador.correo,
        }));
        res.set("X-Total-Count", donadores.length);
        res.json(donadoresWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los donadores" });
    }
};

// Obtener una sola donador por su ID
exports.getDonadorById = async (req, res) => {
    // Extract the id from the route parameters
    const { id } = sanitizeInput(req.params);
    try {
        const donador = await Donador.findById(id);
        if (!donador) {
            return res.status(404).json({ error: "Donador no encontrado" });
        }
        const donadorWithId = {
            id: donador._id,
            nombre: donador.nombre,
            correo: donador.correo,
        };
        res.json(donadorWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener el donador" });
    }
};

// Crear una nueva donador
exports.createDonador = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const newDonador = new Donador({
            nombre: sanitizedBody.nombre,
            correo: sanitizedBody.correo,
        });
        const savedDonador = await newDonador.save();
        res.status(201).json({
            id: savedDonador._id,
            nombre: savedDonador.nombre,
            correo: savedDonador.correo,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al crear el donador" });
    }
};

// Actualizar una donador por su ID
exports.updateDonadorById = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const updatedDonador = await Donador.findByIdAndUpdate(
            req.params.id,
            sanitizedBody,
            { new: true },
        );
        if (!updatedDonador)
            return res.status(404).json({ error: "Donador no encontrado" });
        res.json({
            id: updatedDonador._id,
            nombre: updatedDonador.nombre,
            correo: updatedDonador.correo,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el donador" });
    }
};

// Eliminar una donador por su ID
exports.deleteDonadorById = async (req, res) => {
    const { id } = sanitizeInput(req.params);
    try {
        const deletedDonador = await Donador.findByIdAndDelete(id);
        if (!deletedDonador)
            return res.status(404).json({ error: "Donador no encontrado" });
        res.json({ message: "Donador eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el donador" });
    }
};
