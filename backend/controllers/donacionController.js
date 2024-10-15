// Controladores de recurso de donaciones en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de donación de la base de datos.
const Donacion = require("../models/Donacion");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
// Funcion para sanitizar la entrada
const sanitizeInput = (input) => mongoSanitize(input);

// Obtener todas las donaciones
exports.getAllDonaciones = async (req, res) => {
    try {
        const donaciones = await Donacion.find();
        const donacionesWithId = donaciones.map((donacion) => ({
            id: donacion._id,
            tipo: donacion.tipo,
            monto: donacion.monto,
            fecha: donacion.fecha,
            donador: donacion.donador ? donacion.donador._id : null,
            correo: donacion.donador ? donacion.donador.correo : null,
        }));
        res.set("X-Total-Count", donaciones.length);
        res.json(donacionesWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los donaciones" });
    }
};

// Obtener una sola donacion por su ID
exports.getDonacionById = async (req, res) => {
    const { id } = sanitizeInput(req.params);
    try {
        const donacion = await Donacion.findById(id);
        if (!donacion) {
            return res.status(404).json({ error: "Donación no encontrada" });
        }
        const donacionWithId = {
            tipo: donacion.tipo,
            id: donacion._id,
            monto: donacion.monto,
            fecha: donacion.fecha,
            donador: donacion.donador ? donacion.donador._id : null,
            correo: donacion.donador ? donacion.donador.correo : null,
        };
        res.json(donacionWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la donación" });
    }
};

// Crear una nueva donacion
exports.createDonacion = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const newDonacion = new Donacion({
            tipo: sanitizedBody.tipo,
            monto: sanitizedBody.monto,
            fecha: sanitizedBody.fecha,
            donador: sanitizedBody.donador,
        });
        const savedDonacion = await newDonacion.save();
        res.status(201).json({
            id: savedDonacion._id,
            tipo: savedDonacion.tipo,
            monto: savedDonacion.monto,
            fecha: savedDonacion.fecha,
            donador: savedDonacion.donador,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al crear la donacion" });
    }
};

// Actualizar una donacion por su ID
exports.updateDonacionById = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const updatedDonacion = await Donacion.findByIdAndUpdate(
            req.params.id,
            sanitizedBody,
            { new: true },
        );
        if (!updatedDonacion)
            return res.status(404).json({ error: "Donación no encontrada" });
        res.json({
            id: updatedDonacion._id,
            tipo: updatedDonacion.tipo,
            monto: updatedDonacion.monto,
            fecha: updatedDonacion.fecha,
            correo: updatedDonacion.correo,
        });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar la donación" });
    }
};

// Eliminar una donacion por su ID
exports.deleteDonacionById = async (req, res) => {
    try {
        const deletedDonacion = await Donacion.findByIdAndDelete(req.params.id);
        if (!deletedDonacion) {
            return res.status(404).json({ error: "Donación no encontrada" });
        }
        res.json({ message: "Donación eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar la donación" });
    }
};
