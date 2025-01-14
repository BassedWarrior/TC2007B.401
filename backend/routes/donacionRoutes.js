// Rutas para el recurso de donaciones.
// Coniene todos los endpoints pertinentes al manejo de las donaciones en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Controlador de recurso en la base de datos.
const donacionController = require("../controllers/donacionController");
const auth = require("../middlewares/auth");

router.use((req, res, next) => {
    console.log("Donaciones: %s %s %s", req.method, req.url, req.path);
    next();
});
router.use(auth.authenticateJWT);

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de las donaciones en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los donaciónes de la base de datos.
    .get(donacionController.getAllDonaciones)
    // HTTP POST: Agregar una donación a la base de datos.
    .post(donacionController.createDonacion)

// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a una solo donación de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de donación de la base de datos.
    .get(donacionController.getDonacionById)
    // HTTP PUT: Actualizar un solo registro de donación de la base de datos.
    .put(donacionController.updateDonacionById)
    // HTTP DELETE: Eliminar un solo registro de donación de la base de datos.
    .delete(donacionController.deleteDonacionById);

module.exports = router;
