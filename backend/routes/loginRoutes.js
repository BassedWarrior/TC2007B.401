// Rutas para el inicio de sesión
// Coniene todos los endpoints pertinentes a la autenticación de usuarios

const express = require("express");  // Módulo para generar los endpoints
const router = express.Router();  // Gerente de rutas y de endpoints
// Controlador de inicio de sesión
const loginController = require("../controllers/loginController");

router.use((req, res, next) => {
    console.log("Login: %s %s %s", req.method, req.url, req.path);
    next();
});

// Endpoints de distintos métodos HTTP para la ruta raiz de este recurso
router.route("/")
    // HTTP POST: Mandar credenciales de inicio de sesión
    .post(loginController.authenticate);


module.exports = router;
