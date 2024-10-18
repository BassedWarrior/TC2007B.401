// Rutas para el recurso de donaciones.
// Coniene todos los endpoints pertinentes al manejo de las donaciones en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Controlador de recurso en la base de datos.
const donacionController = require("../controllers/donacionController");

router.use((req, res, next) => {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de las donaciones en la base de datos.
router.route("/")
    // HTTP POST: Agregar una donación a la base de datos.
    .post(donacionController.createDonacion)

module.exports = router;
