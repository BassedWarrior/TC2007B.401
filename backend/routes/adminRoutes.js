// Rutas para el recurso de administradores.
// Coniene todos los endpoints pertinentes al manejo de los administradores en
// la base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Esquema de administrador de la base de datos.
const Admin = require("../models/Admin");


// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de los administradores en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los administradores de la base de datos.
    .get(async (req,res) => {
        try {
            const admins = await Admin.find();
            const adminsWithId = admins.map(admin => ({
                id: admin._id,
                usuario: admin.usuario,
            }));
            res.set('X-Total-Count', admins.length);
            res.json(adminsWithId);
        } catch (err) {
            res.status(500).json(
                { error: 'Error al obtener los administradores'}
            );
        }
    })
    // HTTP POST: Agregar un administrador a la base de datos.
    .post(async (req, res) => {
        try {
            // Obtiene los datos de la respuesta
            const newAdmin = new Admin({
                usuario: req.body.usuario,
                contrasena: req.body.contrasena
            });
            // Guardar el nuevo post en la base de datos
            const savedAdmin = await newAdmin.save();
            res.status(201).json({
                id: savedAdmin._id, // Transformar _id a id para React-Admin
                usuario: savedAdmin.usuario,
                contrasena: savedAdmin.contrasena
            });
        } catch (err) {
            // Responde con un error si algo falla
            res.status(500).json({ error: 'Error al crear el administrador' });
        }
    });


// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a un solo administrador de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de administrador de la base de datos.
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const admin = await Admin.findById(id);
            if (!admin) {
                return res.status(404).json(
                    { error: 'Administrador no encontrado' }
                );
            }
            const adminWithId = {
                id: admin._id,
                usuario: admin.usuario,
            };
            res.json(adminWithId);
        } catch (err) {
            res.status(500).json(
                { error: 'Error al obtener el administrador' }
            );
        }
    })
    // HTTP PUT: Actualizar un solo registro de administrador de la base de
    // datos.
    .put(async (req, res) => {
        try {
            const updatedAdmin = await Admin.findByIdAndUpdate(
                req.params.id, req.body, { new: true }
            );
            if (!updatedAdmin) {
                return res.status(404).json(
                    { error: 'Administrador no encontrado' }
                );
            };
            res.json({
                id: updatedAdmin._id,
                usuario: updatedAdmin.usuario,
                contrasena: updatedAdmin.contrasena
            });
        } catch (err) {
            res.status(500).json(
                { error: 'Error al actualizar los datos del administrador' }
            );
        }
    });


module.exports = router;
