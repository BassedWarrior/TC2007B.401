// Rutas para el dashboard y las gráficas.
// Coniene todos los endpoints pertinentes al manejo de las gráficas
// producidas por la base de datos.

const express = require("express"); // Módulo para generar los endpoints.
const router = express.Router(); // Gerente de rutas y de endpoints.
// Controlador de gráficas generadas por la base de datos.
const graphController = require("../controllers/graphController");
const auth = require("../middlewares/auth");

router.use((req, res, next) => {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});
router.use(auth.authenticateJWT);

// Endpoints de distintos métodos HTTP para la ruta a una gráfica específica.
// Referente a una sola gráfica de la base de datos.
router
    .route("/:id")
    // HTTP GET: Obtener una sola gráfica de la base de datos.
    .get(graphController.getGraphByName)

module.exports = router;
