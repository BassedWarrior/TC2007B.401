const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bcrypt = require("bcryptjs");  // Utilizada para el encriptado de las contraseñas.
const jwt = require("jsonwebtoken");  // Utilizado para mantener la sesión iniciada.
const fs = require("fs");  // Required to access the filesystem.
const https = require("https");  // Required to access the HTTPS protocol.

const app = express();
const PORT = process.env.PORT || 5000;

// Políticas de Cross-Origin Resource Sharing (CORS)
// Únicamente permite conexiones desde nuestro frontend.
app.use(cors({
  origin: 'http://localhost:5173', 
  exposedHeaders: ['X-Total-Count'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.json());

const AdminSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true }
});

const DonadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: {type: String, required: true }
});

const DonacionSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  monto: { type: String, required: true },
  fecha: { type: Date, required: true },
  donador: { type: String, required: true }
});

const ProyectoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  inicio: { type: Date, required: true },
  fin: { type: Date, required: true },
  estado: { type: Boolean, required: true }, // True for active, ffalse forr finished or inactive
  presupuesto: { type: Number, required: true },
  objetivo: { type: String, required: true }
})

const Admin = mongoose.model('Admin', AdminSchema);
const Donador = mongoose.model('Donador', DonadorSchema);
const Donacion = mongoose.model('Donacion', DonacionSchema);
const Proyecto = mongoose.model('Proyecto', ProyectoSchema);

app.post('/api/admins', async (req, res) => {
    try {
        const newAdmin = new Admin({ // Obtiene los datos de la respuesta
            usuario: req.body.usuario,
            contrasena: req.body.contrasena
        });
        const savedAdmin = await newAdmin.save(); // Guardar el nuevo post en la base de datos
        res.status(201).json({
            id: savedAdmin._id, // Transformar _id a id para React-Admin
            usuario: savedAdmin.usuario,
            contrasena: savedAdmin.contrasena
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el administrador' }); // Responde con un error si algo falla
    }
});

app.get('/api/admins', async (req,res) => {
  try {
    const admins = await Admin.find();
    const adminsWithId = admins.map(admin => ({
      id: admin._id,
      usuario: admin.usuario,
    }));
    res.set('X-Total-Count', admins.length);
    res.json(adminsWithId);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los administradores'});
  }
});

app.put('/api/admins/:id', async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) return res.status(404).json({ error: 'Administrador no encontrado' });
        res.json({
            id: updatedAdmin._id,
            usuario: updatedAdmin.usuario,
            contrasena: updatedAdmin.contrasena
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar los datos del administrador' });
    }
});

app.put('/api/admins/:id', async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) return res.status(404).json({ error: 'Administrador no encontrado' });
        res.json({
            id: updatedAdmin._id,
            usuario: updatedAdmin.usuario,
            contrasena: updatedAdmin.contrasena
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar los datos del administrador' });
    }
});

app.post('/api/donadores', async (req, res) => {
    try {
        const newDonador = new Donador({ // Obtiene los datos de la respuesta
            nombre: req.body.nombre,
            correo: req.body.correo
        });
        const savedDonador = await newDonador.save(); // Guardar el nuevo post en la base de datos
        res.status(201).json({
            id: savedDonador._id, 
            nombre: savedDonador.nombre,
            correo: savedDonador.correo
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el donador' }); // Responde con un error si algo falla
    }
});

app.get('/api/donadores', async (req,res) => {
  try {
    const donadores = await Donador.find();
    const donadoresWithId = donadores.map(donador => ({
      id: donador._id,
      nombre: donador.nombre,
      correo: donador.correo
    }));
    res.set('X-Total-Count', donadores.length);
    res.json(donadoresWithId);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los donadores'});
  }
});

app.put('/api/donadores/:id', async (req, res) => {
    try {
        const updatedDonador = await Donador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDonador) return res.status(404).json({ error: 'Donador no encontrado' });
        res.json({
            id: updatedDonador._id,
            nombre: updatedDonador.nombre,
            correo: updatedDonador.correo
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el donador' });
    }
});

app.delete('/api/donadores/:id', async (req, res) => {
    try {
        const deletedDonador = await Donador.findByIdAndDelete(req.params.id);
        if (!deletedDonador) return res.status(404).json({ error: 'Donador no encontrado' });
        res.json({ message: 'Donador eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el donador' });
    }
});


app.get('/api/donaciones', async (req,res) => {
  try {
    const donaciones = await Donacion.find();
    const donacionesWithId = donaciones.map(donacion => ({
      id: donacion._id,
      tipo: donacion.tipo,
      monto: donacion.monto,
      fecha: donacion.fecha,
      donador: donacion.donador

    }));
    res.set('X-Total-Count', donaciones.length);
    res.json(donacionesWithId);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los donaciones'});
  }
});

app.post('/api/donaciones', async (req, res) => {
    try {
        const newDonacion = new Donacion({ // Obtiene los datos de la respuesta
            tipo: req.body.tipo,
            monto: req.body.monto,
            fecha: req.body.fecha,
            donador: req.body.donador
        });
        const savedDonacion = await newDonacion.save(); // Guardar el nuevo post en la base de datos
        res.status(201).json({
            tipo: savedDonacion.tipo,
            monto: savedDonacion.monto,
            fecha: savedDonacion.fecha,
            donador: savedDonacion.donador
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la donacion' }); // Responde con un error si algo falla
    }
});

app.put('/api/donaciones/:id', async (req, res) => {
    try {
        const updatedDonacion = await Donacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDonacion) return res.status(404).json({ error: 'Donación no encontrada' });
        res.json({
            id: updatedDonacion._id,
            tipo: updatedDonacion.tipo,
            monto: updatedDonacion.monto,
            fecha: updatedDonacion.fecha,
            donador: updatedDonacion.donador
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la donación' });
    }
});

app.delete('/api/donaciones/:id', async (req, res) => {
    try {
        const deletedDonacion = await Donacion.findByIdAndDelete(req.params.id);
        if (!deletedDonacion) return res.status(404).json({ error: 'Donación no encontrada' });
        res.json({ message: 'Donación eliminada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la donación' });
    }
});


app.post('/api/proyectos', async (req, res) => {
    try {
        const newProyecto = new Proyecto({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            inicio: req.body.inicio,
            fin: req.body.fin,
            estado: req.body.estado,
            presupuesto: req.body.presupuesto,
            objetivo: req.body.objetivo,
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
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
});

app.get('/api/proyectos', async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        const proyectosWithId = proyectos.map(proyecto => ({
            id: proyecto._id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            inicio: proyecto.inicio,
            fin: proyecto.fin,
            estado: proyecto.estado,
            presupuesto: proyecto.presupuesto,
            objetivo: proyecto.objetivo,
        }));
        res.set('X-Total-Count', proyectos.length);
        res.json(proyectosWithId);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
});

app.put('/api/proyectos/:id', async (req, res) => {
    try {
        const updatedProyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
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
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
});

app.delete('/api/proyectos/:id', async (req, res) => {
    try {
        const deletedProyecto = await Proyecto.findByIdAndDelete(req.params.id);
        if (!deletedProyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
});


// Registrar un nuevo usuario
app.post('/api/registro',  async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;        
        const Hashcontrasena = await bcrypt.hash(contrasena, 10);
        const newAdmin = new Admin({ usuario, contrasena: Hashcontrasena });
        await newAdmin.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
        console.log("Administrador registrado con éxito")
        console.log("Usuario: ", usuario);
        console.log("Contraseña Hasheada: ", Hashcontrasena);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Autenticar a un usuario
app.post('/api/login', async (req, res) => {
    try {  
        const { usuario, contrasena } = req.body;
        const user = await Admin.findOne({ usuario });
        if(!user){
          return res.status(401).json({ error: 'Usuario o Contraseña Incorrectos' });
        }
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ error: 'Usuario o Contraseña Incorrectos' });
        }
        //if (user && await bcrypt.compare(password, user.password)) {
        if (user && isMatch) {
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token});
        } 
        console.log(process.env.JWT_SECRET); 
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

app.get('/', (req, res) => {
  res.send("This is the backend URI")
});

// Set the key and certificate for the server. These should be generated
// locally and stored in the specified paths.
const options = {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.crt")
};

// Create the server listener in the specified port using HTTPS instead of HTTP.
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
