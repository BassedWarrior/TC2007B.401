const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs");  // Utilizada para el encriptado de las contraseñas.
const jwt = require("jsonwebtoken");  // Utilizado para mantener la sesión iniciada.
const fs = require("fs");  // Required to access the filesystem.
const https = require("https");  // Required to access the HTTPS protocol.
// Rutas de endpoints de los recursos definidos en sus propios archivos.
// Contienen todos los endpoints que se requieran para ese recurso.
const adminRoutes = require("./routes/adminRoutes");
const donadorRoutes = require("./routes/donadorRoutes");
const donacionRoutes = require("./routes/donacionRoutes");
const proyectoRoutes = require("./routes/proyectoRoutes");
// Rutas de endpoints para el inicio de sesión
const loginRoutes = require("./routes/loginRoutes");
// Esquema de administrador para registro.
const Admin = require("./models/Admin");

const app = express();
const PORT = process.env.PORT || 5000;

// Políticas de Cross-Origin Resource Sharing (CORS)
// Únicamente permite conexiones desde nuestro frontend.
app.use(
    cors({
        origin: "https://localhost:5173",
        exposedHeaders: ["X-Total-Count"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use(express.json());

// Función para sanitizar entrada
const sanitizeInput = (input) => mongoSanitize(input);

// Utilizar rutas de endpoints para cada recurso.
app.use("/api/admins", adminRoutes);
app.use("/api/donadores", donadorRoutes);
app.use("/api/donaciones", donacionRoutes);
app.use("/api/proyectos", proyectoRoutes);

// Utilizar rutas de endpoints para inicio de sesión
app.use("/api/login", loginRoutes);

// Registrar un nuevo usuario
app.post("/api/registro", async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);
        const { usuario, contrasena, correo, nombre, apellido, rol } =
            sanitizedBody;

        const Hashcontrasena = await bcrypt.hash(contrasena, 10);

        const newAdmin = new Admin({
            usuario,
            contrasena: Hashcontrasena,
            correo,
            nombre,
            apellido,
            rol,
        });

        await newAdmin.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
        console.log("Administrador registrado con éxito");
        console.log("Usuario: ", usuario);
        console.log("Contraseña Hasheada: ", Hashcontrasena);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
});

app.get("/", (req, res) => {
    res.send("This is the backend URI");
});

// Set the key and certificate for the server. These should be generated
// locally and stored in the specified paths.
const options = {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.crt"),
};

// Create the server listener in the specified port using HTTPS instead of HTTP.
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
