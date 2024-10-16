// Rutas para el recurso de administradores.
// Coniene todos los endpoints pertinentes al manejo de los administradores en
// la base de datos.

const express = require("express"); // Módulo para generar los endpoints.
const router = express.Router(); // Gerente de rutas y de endpoints.
// Controlador de recurso en la base de datos.
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");

router.use((req, res, next) => {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});
router.use(auth.authenticateJWT);

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso.
// Referente a la totalidad de los administradores en la base de datos.
router
    .route("/")
    // HTTP GET: Obtener todos los administradores de la base de datos.
    .get(adminController.getAllAdmins)
    // HTTP POST: Agregar un administrador a la base de datos.
    .post(adminController.createAdmin);

// Endpoints de distintos métodos HTTP para la ruta a un objeto específico.
// Referente a un solo administrador de la base de datos.
router
    .route("/:id")
    // HTTP GET: Obtener un solo registro de administrador de la base de datos.
    .get(adminController.getAdminById)
    // HTTP PUT: Actualizar un solo registro de administrador de la base de
    // datos.
    .put(adminController.updateAdminById)
    // HTTP DELETE: Eliminar un solo registro de administrador de la base de datos.
    .delete(adminController.deleteAdminById);

module.exports = router;
