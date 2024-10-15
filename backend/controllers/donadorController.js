// Controladores de recurso de donadores en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de donador de la base de datos.
const Donador = require("../models/Donador");


// Obtener todas las donadores
exports.getAllDonadores = async (req,res) => {
    try {
        const donadores = await Donador.find();
        const donadoresWithId = donadores.map(donador => ({
            id: donador._id,
            nombre: donador.nombre,
            correo: donador.correo
        }));
        res.set('X-Total-Count', donadores.length);
        res.json(donadoresWithId);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los donadores'});
    }
};


// Obtener una sola donador por su ID
exports.getDonadorById = async (req, res) => {
    // Extract the id from the route parameters
    const { id } = req.params;
    try {
        // Find the donador by ObjectId
        const donador = await Donador.findById(id);
        if (!donador) {
            return res.status(404).json({ error: 'Donador no encontrado' });
        }
        const donadorWithId = {
            id: donador._id,
            nombre: donador.nombre,
            correo: donador.correo
        };
        res.json(donadorWithId);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el donador' });
    }
};


// Crear una nueva donador
exports.createDonador = async (req, res) => {
    try {
        // Obtiene los datos de la respuesta
        const newDonador = new Donador({
            nombre: req.body.nombre,
            correo: req.body.correo
        });
        // Guardar el nuevo post en la base de datos
        const savedDonador = await newDonador.save();
        res.status(201).json({
            id: savedDonador._id,
            nombre: savedDonador.nombre,
            correo: savedDonador.correo
        });
    } catch (err) {
        // Responde con un error si algo falla
        res.status(500).json({ error: 'Error al crear el donador' });
    }
};


// Actualizar una donador por su ID
exports.updateDonadorById = async (req, res) => {
    try {
        const updatedDonador = await Donador.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        if (!updatedDonador) {
            return res.status(404).json(
                { error: 'Donador no encontrado' }
            );
        };
        res.json({
            id: updatedDonador._id,
            nombre: updatedDonador.nombre,
            correo: updatedDonador.correo
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el donador' });
    }
};


// Eliminar una donador por su ID
exports.deleteDonadorById = async (req, res) => {
    try {
        const deletedDonador = await Donador.findByIdAndDelete(
            req.params.id
        );
        if (!deletedDonador) {
            return res.status(404).json(
                { error: 'Donador no encontrado' }
            );
        };
        res.json({ message: 'Donador eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el donador' });
    }
};
