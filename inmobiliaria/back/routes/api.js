var express = require('express');
var router = express.Router();
var tasacionesModel = require('./../models/tasacionesModel');
var propiedadesModel = require('./../models/propiedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

function buildPropiedadResponse(propiedad) {
    if (!propiedad) return null;
    let imageUrl = propiedad.imagen || '';
    if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = cloudinary.url(propiedad.imagen, {
            width: 600,
            crop: 'fill'
        });
    }
    return {
        id: propiedad.id,
        title: propiedad.titulo,
        price: propiedad.precio,
        address: propiedad.direccion,
        description: propiedad.descripcion,
        image: imageUrl
    };
}

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
        }
    });
    res.json(tasaciones);
});

router.post('/contacto', async (req, res) => {
    try {
        const mail = {
            to: process.env.ADMIN_EMAIL || 'nataliaponce60@gmail.com',
            subject: 'Contacto desde la web',
            html: `${req.body.nombre} se contacto a traves de la web y quiere más información a este correo: ${req.body.email} <br>
            Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su teléfono es: ${req.body.telefono}`
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
            message: 'Mensaje enviado'
        });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({
            error: true,
            message: 'Error al enviar el mensaje'
        });
    }
});

router.post('/tasaciones', async (req, res) => {
  try {
    const { nombre, email, telefono, description } = req.body;
    
    let emailContent = `${nombre} solicitó una tasación a través del formulario web.<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Teléfono:</strong> ${telefono}<br>
      <strong>Descripción de la propiedad:</strong> ${description}`;
    
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

router.get('/propiedades', async function(req, res, next) {
  try {
    const propiedades = await propiedadesModel.getPropiedades();
    res.json(propiedades.map(buildPropiedadResponse));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error al listar propiedades' });
  }
});

router.get('/propiedades/:id', async function(req, res, next) {
  try {
    const propiedad = await propiedadesModel.getPropiedadById(req.params.id);
    if (!propiedad) {
      return res.status(404).json({ error: true, message: 'Propiedad no encontrada' });
    }
    res.json(buildPropiedadResponse(propiedad));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error al obtener la propiedad' });
  }
});

router.post('/propiedades', async function(req, res, next) {
  try {
    const { title, price, address, description, image, imagen } = req.body;
    const nuevaPropiedad = {
      titulo: title,
      precio: price,
      direccion: address,
      descripcion: description,
      imagen: image || imagen || ''
    };

    const id = await propiedadesModel.insertPropiedad(nuevaPropiedad);
    res.status(201).json({ error: false, message: 'Propiedad creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error al crear la propiedad' });
  }
});

router.put('/propiedades/:id', async function(req, res, next) {
  try {
    const { title, price, address, description, image, imagen } = req.body;
    const propiedad = {
      id: req.params.id,
      titulo: title,
      precio: price,
      direccion: address,
      descripcion: description,
      imagen: image || imagen || ''
    };

    const changed = await propiedadesModel.updatePropiedadById(propiedad);
    if (changed === 0) {
      return res.status(404).json({ error: true, message: 'Propiedad no encontrada' });
    }
    res.json({ error: false, message: 'Propiedad actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error al actualizar la propiedad' });
  }
});

router.delete('/propiedades/:id', async function(req, res, next) {
  try {
    const deleted = await propiedadesModel.deletePropiedadById(req.params.id);
    if (deleted === 0) {
      return res.status(404).json({ error: true, message: 'Propiedad no encontrada' });
    }
    res.json({ error: false, message: 'Propiedad eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Error al eliminar la propiedad' });
  }
});

module.exports = router;