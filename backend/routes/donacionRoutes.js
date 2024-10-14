// Rutas para el recurso de donaciones.
// Coniene todos los endpoints pertinentes al manejo de las donaciones en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Esquema de donación de la base de datos.
const Donacion = require("../models/Donacion");


// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de las donaciones en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los donaciónes de la base de datos.
    .get(async (req,res) => {
        try {
            const donaciones = await Donacion.find();
            const donacionesWithId = donaciones.map(donacion => ({
                id: donacion._id,
                tipo: donacion.tipo,
                monto: donacion.monto,
                fecha: donacion.fecha,
                correo: donacion.correo,
                // Referencia al id del donador
                donador: donacion.donador ? donacion.donador._id : null,
                // Muestra el correo si existe el donador
                correo: donacion.donador ? donacion.donador.correo : null
            }));
            res.set('X-Total-Count', donaciones.length);
            res.json(donacionesWithId);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener los donaciones'});
        }
    })
    // HTTP POST: Agregar una donación a la base de datos.
    .post(async (req, res) => {
        try {
            const newDonacion = new Donacion({
                tipo: req.body.tipo,
                monto: req.body.monto,
                fecha: req.body.fecha,
                // Debe ser el ID del donador, no el correo
                donador: req.body.donador
            });
            const savedDonacion = await newDonacion.save();
            res.status(201).json({
                id: savedDonacion._id,
                tipo: savedDonacion.tipo,
                monto: savedDonacion.monto,
                fecha: savedDonacion.fecha,
                donador: savedDonacion.donador  // Devolver el ID del donador
            });
        } catch (err) {
            res.status(500).json({ error: 'Error al crear la donacion' });
        }
    });


// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a una solo donación de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de donación de la base de datos.
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const donacion = await Donacion.findById(id);
            if (!donacion) {
                return res.status(404).json(
                    { error: 'Donación no encontrada' }
                );
            }
            const donacionWithId = {
                id: donacion._id,
                tipo: donacion.tipo,
                monto: donacion.monto,
                fecha: donacion.fecha,
                correo: donacion.correo,
                // Referencia al id del donador
                donador: donacion.donador ? donacion.donador._id : null,
                // Muestra el correo si existe el donador
                correo: donacion.donador ? donacion.donador.correo : null
            };
            res.json(donacionWithId);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener la donación' });
        }
    })
    // HTTP PUT: Actualizar un solo registro de donación de la base de datos.
    .put(async (req, res) => {
        try {
            const updatedDonacion = await Donacion.findByIdAndUpdate(
                req.params.id, req.body, { new: true }
            );
            if (!updatedDonacion) {
                return res.status(404).json(
                    { error: 'Donación no encontrada' }
                );
            };
            res.json({
                id: updatedDonacion._id,
                tipo: updatedDonacion.tipo,
                monto: updatedDonacion.monto,
                fecha: updatedDonacion.fecha,
                correo: updatedDonacion.correo
            });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar la donación' });
        }
    })
    // HTTP DELETE: Eliminar un solo registro de donación de la base de datos.
    .delete(async (req, res) => {
        try {
            const deletedDonacion = await Donacion.findByIdAndDelete(
                req.params.id
            );
            if (!deletedDonacion) {
                return res.status(404).json(
                    { error: 'Donación no encontrada' }
                );
            };
            res.json({ message: 'Donación eliminada' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar la donación' });
        }
    });


module.exports = router;
