const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Utilizada para el encriptado de las contraseñas.
const jwt = require("jsonwebtoken"); // Utilizado para mantener la sesión iniciada.
const fs = require("fs"); // Required to access the filesystem.
const https = require("https"); // Required to access the HTTPS protocol.

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

// Esquemas de Mongoose con validación estricta

const AdminSchema = new mongoose.Schema(
  {
    usuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    correo: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    rol: { type: String, required: true, enum: ["administrador", "empleado"] },
  },
  { strict: true },
);

const DonadorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },
  },
  { strict: true },
);

const DonacionSchema = new mongoose.Schema(
  {
    tipo: { type: String, required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, required: true },
    donador: { type: mongoose.Schema.Types.ObjectId, ref: "Donador" },
  },
  { strict: true },
);

const ProyectoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    inicio: { type: Date, required: false },
    fin: { type: Date, required: false },
    estado: {
      type: String,
      enum: ["planeado", "en progreso", "completado", "cancelado"],
      default: "planeado",
      required: true,
    },
    presupuesto: { type: Number, required: false },
    objetivo: { type: Number, required: false },
  },
  { strict: true },
);

const Admin = mongoose.model("Admin", AdminSchema);
const Donador = mongoose.model("Donador", DonadorSchema);
const Donacion = mongoose.model("Donacion", DonacionSchema);
const Proyecto = mongoose.model("Proyecto", ProyectoSchema);

// Función para sanitizar entrada
const sanitizeInput = (input) => mongoSanitize(input);

app.post("/api/admins", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const newAdmin = new Admin({
      usuario: sanitizedBody.usuario,
      contrasena: sanitizedBody.contrasena,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json({
      id: savedAdmin._id,
      usuario: savedAdmin.usuario,
      contrasena: savedAdmin.contrasena,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el administrador" });
  }
});

app.get("/api/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    const adminsWithId = admins.map((admin) => ({
      id: admin._id,
      usuario: admin.usuario,
    }));
    res.set("X-Total-Count", admins.length);
    res.json(adminsWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los administradores" });
  }
});

app.get("/api/admins/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    const adminWithId = {
      id: admin._id,
      usuario: admin.usuario,
    };
    res.json(adminWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el administrador" });
  }
});

app.put("/api/admins/:id", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      sanitizedBody,
      { new: true },
    );
    if (!updatedAdmin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    res.json({
      id: updatedAdmin._id,
      usuario: updatedAdmin.usuario,
      contrasena: updatedAdmin.contrasena,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al actualizar los datos del administrador" });
  }
});

app.post("/api/donadores", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const newDonador = new Donador({
      nombre: sanitizedBody.nombre,
      correo: sanitizedBody.correo,
    });
    const savedDonador = await newDonador.save();
    res.status(201).json({
      id: savedDonador._id,
      nombre: savedDonador.nombre,
      correo: savedDonador.correo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el donador" });
  }
});

app.get("/api/donadores", async (req, res) => {
  try {
    const donadores = await Donador.find();
    const donadoresWithId = donadores.map((donador) => ({
      id: donador._id,
      nombre: donador.nombre,
      correo: donador.correo,
    }));
    res.set("X-Total-Count", donadores.length);
    res.json(donadoresWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los donadores" });
  }
});

app.get("/api/donadores/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const donador = await Donador.findById(id);
    if (!donador) {
      return res.status(404).json({ error: "Donador no encontrado" });
    }
    const donadorWithId = {
      id: donador._id,
      nombre: donador.nombre,
      correo: donador.correo,
    };
    res.json(donadorWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el donador" });
  }
});

app.put("/api/donadores/:id", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const updatedDonador = await Donador.findByIdAndUpdate(
      req.params.id,
      sanitizedBody,
      { new: true },
    );
    if (!updatedDonador)
      return res.status(404).json({ error: "Donador no encontrado" });
    res.json({
      id: updatedDonador._id,
      nombre: updatedDonador.nombre,
      correo: updatedDonador.correo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el donador" });
  }
});

app.delete("/api/donadores/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const deletedDonador = await Donador.findByIdAndDelete(id);
    if (!deletedDonador)
      return res.status(404).json({ error: "Donador no encontrado" });
    res.json({ message: "Donador eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el donador" });
  }
});

app.get("/api/donaciones", async (req, res) => {
  try {
    const donaciones = await Donacion.find();
    const donacionesWithId = donaciones.map((donacion) => ({
      id: donacion._id,
      tipo: donacion.tipo,
      monto: donacion.monto,
      fecha: donacion.fecha,
      donador: donacion.donador ? donacion.donador._id : null,
      correo: donacion.donador ? donacion.donador.correo : null,
    }));
    res.set("X-Total-Count", donaciones.length);
    res.json(donacionesWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los donaciones" });
  }
});

app.get("/api/donaciones/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const donacion = await Donacion.findById(id);
    if (!donacion) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }
    const donacionWithId = {
      id: donacion._id,
      tipo: donacion.tipo,
      monto: donacion.monto,
      fecha: donacion.fecha,
      donador: donacion.donador ? donacion.donador._id : null,
      correo: donacion.donador ? donacion.donador.correo : null,
    };
    res.json(donacionWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la donación" });
  }
});

app.post("/api/donaciones", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const newDonacion = new Donacion({
      tipo: sanitizedBody.tipo,
      monto: sanitizedBody.monto,
      fecha: sanitizedBody.fecha,
      donador: sanitizedBody.donador,
    });
    const savedDonacion = await newDonacion.save();
    res.status(201).json({
      id: savedDonacion._id,
      tipo: savedDonacion.tipo,
      monto: savedDonacion.monto,
      fecha: savedDonacion.fecha,
      donador: savedDonacion.donador,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear la donacion" });
  }
});

app.put("/api/donaciones/:id", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const updatedDonacion = await Donacion.findByIdAndUpdate(
      req.params.id,
      sanitizedBody,
      { new: true },
    );
    if (!updatedDonacion)
      return res.status(404).json({ error: "Donación no encontrada" });
    res.json({
      id: updatedDonacion._id,
      tipo: updatedDonacion.tipo,
      monto: updatedDonacion.monto,
      fecha: updatedDonacion.fecha,
      correo: updatedDonacion.correo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la donación" });
  }
});

app.delete("/api/donaciones/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const deletedDonacion = await Donacion.findByIdAndDelete(id);
    if (!deletedDonacion)
      return res.status(404).json({ error: "Donación no encontrada" });
    res.json({ message: "Donación eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la donación" });
  }
});

app.post("/api/proyectos", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const newProyecto = new Proyecto({
      nombre: sanitizedBody.nombre,
      descripcion: sanitizedBody.descripcion,
      inicio: sanitizedBody.inicio,
      fin: sanitizedBody.fin,
      estado: sanitizedBody.estado,
      presupuesto: sanitizedBody.presupuesto,
      objetivo: sanitizedBody.objetivo,
    });
    const savedProyecto = await newProyecto.save();
    res.status(201).json({
      id: savedProyecto._id,
      nombre: savedProyecto.nombre,
      descripcion: savedProyecto.descripcion,
      inicio: savedProyecto.inicio,
      fin: savedProyecto.fin,
      estado: savedProyecto.estado,
      presupuesto: savedProyecto.presupuesto,
      objetivo: savedProyecto.objetivo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
});

app.get("/api/proyectos", async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    const proyectosWithId = proyectos.map((proyecto) => ({
      id: proyecto._id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      inicio: proyecto.inicio,
      fin: proyecto.fin,
      estado: proyecto.estado,
      presupuesto: proyecto.presupuesto,
      objetivo: proyecto.objetivo,
    }));
    res.set("X-Total-Count", proyectos.length);
    res.json(proyectosWithId);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
});

app.get("/api/proyectos/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    const proyectoConId = {
      id: proyecto._id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      inicio: proyecto.inicio,
      fin: proyecto.fin,
      estado: proyecto.estado,
      presupuesto: proyecto.presupuesto,
      objetivo: proyecto.objetivo,
    };
    res.json(proyectoConId);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar el proyecto" });
  }
});

app.put("/api/proyectos/:id", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const updatedProyecto = await Proyecto.findByIdAndUpdate(
      req.params.id,
      sanitizedBody,
      { new: true },
    );
    if (!updatedProyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({
      id: updatedProyecto._id,
      nombre: updatedProyecto.nombre,
      descripcion: updatedProyecto.descripcion,
      inicio: updatedProyecto.inicio,
      fin: updatedProyecto.fin,
      estado: updatedProyecto.estado,
      presupuesto: updatedProyecto.presupuesto,
      objetivo: updatedProyecto.objetivo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
});

app.delete("/api/proyectos/:id", async (req, res) => {
  const { id } = sanitizeInput(req.params);
  try {
    const deletedProyecto = await Proyecto.findByIdAndDelete(id);
    if (!deletedProyecto)
      return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({ message: "Proyecto eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el proyecto" });
  }
});

// Registrar un nuevo usuario
app.post("/api/registro", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const { usuario, contrasena } = sanitizedBody;
    const Hashcontrasena = await bcrypt.hash(contrasena, 10);
    const newAdmin = new Admin({ usuario, contrasena: Hashcontrasena });
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

// Autenticar a un usuario
app.post("/api/login", async (req, res) => {
  try {
    const sanitizedBody = sanitizeInput(req.body);
    const { usuario, contrasena } = sanitizedBody;
    const user = await Admin.findOne({ usuario });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Usuario o Contraseña Incorrectos" });
    }
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Usuario o Contraseña Incorrectos" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
    console.log(process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
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
