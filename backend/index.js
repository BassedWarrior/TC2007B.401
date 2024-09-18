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

const Admin = mongoose.model('Admin', AdminSchema);

app.post('/api/admins', async (req, res) => {
  try {
    const newAdmin = new Post(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear admin '});
  }
});

app.post('/api/admins', async (req, res) => {
    try {
        const newAdmin = new Post({ // Obtiene los datos de la respuesta
            usuario: req.body.title,
            contrasena: req.body.content
        });
        const savedAdmin = await newAdmin.save(); // Guardar el nuevo post en la base de datos
        res.status(201).json({
            id: savedPost._id, // Transformar _id a id para React-Admin
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

app.get('/', (req, res) => {
  res.send("This is the backend URI")
});

app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));
