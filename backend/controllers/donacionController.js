// Controladores de recurso de donaciones en la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de donación de la base de datos.
const Donacion = require("../models/Donacion");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
// Funcion para sanitizar la entrada
const sanitizeInput = (input) => mongoSanitize(input);

const nodemailer = require("nodemailer");
// Obtener todas las donaciones

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para usar SSL
    auth: {
        user: "test.testertestorio@gmail.com",
        pass: "jdtv axxi dpuo sebk",
    },
});

const CorreoDeAgradecimiento = async (email, nombre, monto) => {
    const mailOptions = {
        from: '"Tu Donación a Fundación Sanders" <tu-correo@gmail.com>',
        to: email,
        subject: "Gracias por tu donación!",
        html: `
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Gracias por tu Donación</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; padding: 20px; border-radius: 8px;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <h1 style="color: #333333; font-size: 24px;">¡Gracias por tu Donación, ${nombre}!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <p style="color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
            Nos complace informarte que hemos recibido tu generosa contribución de <strong>${monto} MXN</strong>.
          </p>
          <p style="color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
            Gracias a donaciones como la tuya, seguimos trabajando para proporcionar agua potable a comunidades en necesidad. 
            <br />Tu apoyo hace una diferencia real en la vida de muchas personas.
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <img src="https://sanders.com.mx/wp-content/uploads/2022/08/5.png" alt="Fundación Sanders" width="100%" style="max-width: 300px; border-radius: 8px;" />
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0;">
          <p style="color: #666666; font-size: 16px; line-height: 24px; text-align: center;">
            Actualmente, más de 12 millones de personas no tienen acceso a agua potable. Con tu ayuda, 
            <br />nos acercamos un paso más a nuestra misión de llevar agua limpia a todas las comunidades.
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 30px 0;">
          <a href="https://sanders.com.mx/" style="background-color: #28a745; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 18px;">
            Conoce más sobre nuestro trabajo
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; text-align: center;">
          <hr style="border: none; height: 1px; background-color: #dddddd; margin: 20px 0;" />
          <p style="color: #999999; font-size: 12px;">
            Fundación Sanders, Av. Siempre Viva 123, Ciudad de México, México
            <br />Si tienes alguna pregunta, contáctanos en <a href="mailto:info@sanders.com.mx" style="color: #28a745;">info@sanders.com.mx</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado correctamente: " + info.response);
    } catch (error) {
        console.error("Error enviando el correo: ", error, email);
        throw new Error("Error enviando el correo");
    }
};

exports.getAllDonaciones = async (req, res) => {
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
};

// Obtener una sola donacion por su ID
exports.getDonacionById = async (req, res) => {
    const { id } = sanitizeInput(req.params);
    try {
        const donacion = await Donacion.findById(id);
        if (!donacion) {
            return res.status(404).json({ error: "Donación no encontrada" });
        }
        const donacionWithId = {
            tipo: donacion.tipo,
            id: donacion._id,
            monto: donacion.monto,
            fecha: donacion.fecha,
            donador: donacion.donador ? donacion.donador._id : null,
            correo: donacion.donador ? donacion.donador.correo : null,
        };
        res.json(donacionWithId);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la donación" });
    }
};

const Donador = require("../models/Donador"); // Make sure you have a Donador model

// Crear una nueva donacion
exports.createDonacion = async (req, res) => {
    try {
        const sanitizedBody = sanitizeInput(req.body);

        let donador = await Donador.findById(sanitizedBody.donador);

        if (!donador) {
            if (!sanitizedBody.nombre || !sanitizedBody.correo) {
                return res.status(400).json({ error: "Faltan datos del donador" });
            }
            donador = new Donador({
                nombre: sanitizedBody.nombre,
                correo: sanitizedBody.correo,
            });
            try {
                donador = await donador.save();
            } catch (err) {
                return res.status(500).json({ error: "Error al crear el donador" });
            }
        }

        const newDonacion = new Donacion({
            tipo: sanitizedBody.tipo,
            monto: sanitizedBody.monto,
            fecha: sanitizedBody.fecha,
            donador: donador._id,
        });

        const savedDonacion = await newDonacion.save();

        try {
            await CorreoDeAgradecimiento(donador.correo, donador.nombre, sanitizedBody.monto);
        } catch (emailError) {
            console.error("Error enviando el correo de agradecimiento:", emailError);
        }

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
};

// Actualizar una donacion por su ID
exports.updateDonacionById = async (req, res) => {
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
};

// Eliminar una donacion por su ID
exports.deleteDonacionById = async (req, res) => {
    try {
        const deletedDonacion = await Donacion.findByIdAndDelete(req.params.id);
        if (!deletedDonacion) {
            return res.status(404).json({ error: "Donación no encontrada" });
        }
        res.json({ message: "Donación eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar la donación" });
    }
};
