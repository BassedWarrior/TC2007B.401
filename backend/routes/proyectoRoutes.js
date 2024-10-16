// Rutas para el recurso de proyectos.
// Coniene todos los endpoints pertinentes al manejo de los proyectos en la
// base de datos.

const express = require("express");  // Módulo para generar los endpoints.
const router = express.Router();  // Gerente de rutas y de endpoints.
// Controlador de recurso en la base de datos.
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");

router.use((req, res, next) => {
    console.log("Proyectos: %s %s %s", req.method, req.url, req.path);
    next();
});
router.use(auth.authenticateJWT);

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de los proyectos en la base de datos.
router.route("/")
    // HTTP GET: Obtener todos los proyectoes de la base de datos.
    .get(proyectoController.getAllProyectos)
    // HTTP POST: Agregar una proyecto a la base de datos.
    .post(proyectoController.createProyecto)

// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a una solo proyecto de la base de datos.
router.route("/:id")
    // HTTP GET: Obtener un solo registro de proyecto de la base de datos.
    .get(proyectoController.getProyectoById)
    // HTTP PUT: Actualizar un solo registro de proyecto de la base de datos.
    .put(proyectoController.updateProyectoById)
    // HTTP DELETE: Eliminar un solo registro de proyecto de la base de datos.
    .delete(proyectoController.deleteProyectoById);

module.exports = router;
