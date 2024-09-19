const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  exposedHeaders: ['X-Total-Count'],
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

const Admin = mongoose.model('Admin', AdminSchema);
const Donador = mongoose.model('Donador', DonadorSchema);


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

app.get('/', (req, res) => {
  res.send("This is the backend URI")
});

app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));
