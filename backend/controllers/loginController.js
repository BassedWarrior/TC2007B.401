// Controlador de inicio de sesión.
// Métodos encargados de las interacciones con la base de datos.

// Utilizada para el encriptado de las contraseñas.
const bcrypt = require("bcryptjs");
// Utilizado para mantener la sesión iniciada.
const jwt = require("jsonwebtoken");
// Esquema de administrador de la base de datos.
const Admin = require("../models/Admin");


exports.authenticate = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const user = await Admin.findOne({ usuario });
        if (!user) {
          return res.status(401).json(
              { error: 'Usuario o Contraseña Incorrectos' }
          );
        }
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json(
                { error: 'Usuario o Contraseña Incorrectos' }
            );
        }
        const token = jwt.sign(
            { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }
        );
        res.json({ token });
        console.log(process.env.JWT_SECRET);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
