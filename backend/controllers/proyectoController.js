// Controladores de recurso de proyectos en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de proyecto de la base de datos.
const Proyecto = require("../models/Proyecto");


// Obtener todas las proyectos
exports.getAllProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        const proyectosWithId = proyectos.map(proyecto => ({
            id: proyecto._id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            inicio: proyecto.inicio,
            fin: proyecto.fin,
            estado: proyecto.estado,
            presupuesto: proyecto.presupuesto,
            objetivo: proyecto.objetivo,
        }));
        res.set('X-Total-Count', proyectos.length);
        res.json(proyectosWithId);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};


// Obtener una sola proyecto por su ID
exports.getProyectoById = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.findById(id);

        if (!proyecto) {
            return res.status(404).json(
                { error: 'Proyecto no encontrado' }
            );
        }

        const proyectoConId = {
            id: proyecto._id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            inicio: proyecto.inicio,
            fin: proyecto.fin,
            estado: proyecto.estado,
            presupuesto: proyecto.presupuesto,
            objetivo: proyecto.objetivo,
        };

        res.json(proyectoConId);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar el proyecto' });
    }
};


// Crear una nueva proyecto
exports.createProyecto = async (req, res) => {
    try {
        const newProyecto = new Proyecto({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            inicio: req.body.inicio,
            fin: req.body.fin,
            estado: req.body.estado,
            presupuesto: req.body.presupuesto,
            objetivo: req.body.objetivo,
        });
        const savedProyecto = await newProyecto.save();
        res.status(201).json({
            id: savedProyecto._id,
            nombre: savedProyecto.nombre,
            descripcion: savedProyecto.descripcion,
            inicio: savedProyecto.inicio,
            fin: savedProyecto.fin,
            estado: savedProyecto.estado,
            presupuesto: savedProyecto.presupuesto,
            objetivo: savedProyecto.objetivo,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};


// Actualizar una proyecto por su ID
exports.updateProyectoById = async (req, res) => {
    try {
        const updatedProyecto = await Proyecto.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        if (!updatedProyecto) {
            return res.status(404).json(
                { error: 'Proyecto no encontrado' }
            );
        };
        res.json({
            id: updatedProyecto._id,
            nombre: updatedProyecto.nombre,
            descripcion: updatedProyecto.descripcion,
            inicio: updatedProyecto.inicio,
            fin: updatedProyecto.fin,
            estado: updatedProyecto.estado,
            presupuesto: updatedProyecto.presupuesto,
            objetivo: updatedProyecto.objetivo,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};


// Eliminar una proyecto por su ID
exports.deleteProyectoById = async (req, res) => {
    try {
        const deletedProyecto = await Proyecto.findByIdAndDelete(
            req.params.id
        );
        if (!deletedProyecto) {
            return res.status(404).json(
                { error: 'Proyecto no encontrado' }
            );
        };
        res.json({ message: 'Proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};
