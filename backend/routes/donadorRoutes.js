// Rutas para el recurso de donadores.
// Coniene todos los endpoints pertinentes al manejo de los donadores en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Controlador de recurso en la base de datos.
const donadorController = require("../controllers/donadorController");
const auth = require("../middlewares/auth");

router.use((req, res, next) => {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});
router.use(auth.authenticateJWT);

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de los donadores en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los donadores de la base de datos.
    .get(donadorController.getAllDonadores)
    // HTTP POST: Agregar una donador a la base de datos.
    .post(donadorController.createDonador);


// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a una solo donador de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de donador de la base de datos.
    .get(donadorController.getDonadorById)
    // HTTP PUT: Actualizar un solo registro de donador de la base de datos.
    .put(donadorController.updateDonadorById)
    // HTTP DELETE: Eliminar un solo registro de donador de la base de datos.
    .delete(donadorController.deleteDonadorById);

module.exports = router;
