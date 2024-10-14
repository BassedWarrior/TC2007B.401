// Rutas para el recurso de donadores.
// Coniene todos los endpoints pertinentes al manejo de los donadores en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Esquema de donador de la base de datos.
const Donador = require("../models/Donador");


// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de los donadores en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los donadores de la base de datos.
    .get(async (req,res) => {
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
    })
    // HTTP POST: Agregar una donador a la base de datos.
    .post(async (req, res) => {
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
    });


// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a una solo donador de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de donador de la base de datos.
    .get(async (req, res) => {
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
    })
    // HTTP PUT: Actualizar un solo registro de donador de la base de datos.
    .put(async (req, res) => {
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
    })
    // HTTP DELETE: Eliminar un solo registro de donador de la base de datos.
    .delete(async (req, res) => {
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
    });


module.exports = router;
