var express = require('express');
var router = express.Router();
var tasacionesModel = require('./../models/tasacionesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/tasaciones', async function(req, res, next) {
    let tasaciones = await tasacionesModel.getTasaciones();
    tasaciones = tasaciones.map(tasacion => {
        if (tasacion.img_id) {
            const imagen = cloudinary.image(tasacion.img_id, {
                width: 960, 
                height: 200,
                crop: 'fill'
            });
            return {
                ...tasacion,
                imagen
            }
        } else {
            return {
                ...tasacion,
                imagen: ''
            }
        }});
    res.json(tasaciones);

});

router.post('/tasaciones', async (req, res) => {
  try {
    const { nombre, email, telefono, description } = req.body;
    
    // Build email content
    let emailContent = `${nombre} solicitó una tasación a través del formulario web.<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Teléfono:</strong> ${telefono}<br>
      <strong>Descripción de la propiedad:</strong> ${description}`;
    
    // Add image info if provided
    if (req.files && req.files.imagen) {
      const imagenFile = req.files.imagen;
      emailContent += `<br><strong>Archivo adjunto:</strong> ${imagenFile.name}`;
    }
    
    const mail = {
      to: process.env.ADMIN_EMAIL || 'nataliaponce60@gmail.com',
      subject: 'Nueva solicitud de tasación',
      html: emailContent
    };
    
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
    
    await transport.sendMail(mail);
    
    res.status(201).json({
      error: false,
      message: 'Solicitud de tasación enviada correctamente'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: true,
      message: 'Error al enviar la solicitud'
    });
  }
});

module.exports = router;