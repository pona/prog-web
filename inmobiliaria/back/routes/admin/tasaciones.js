var express = require('express');
var router = express.Router();
var propiedadesModel = require('./../../models/propiedadesModel');
var cloudinary = require('cloudinary').v2;
var uploader = cloudinary.uploader.upload;
var destroy = cloudinary.uploader.destroy;

router.get('/', async function(req, res, next) {
    try {
        let propiedades = await propiedadesModel.getPropiedades();
        propiedades = propiedades.map(propiedad => {
            if (propiedad.imagen) {
                const imagen = cloudinary.image(propiedad.imagen, {
                    width: 120,
                    height: 100,
                    crop: 'fill'
                });
                return {
                    ...propiedad,
                    imagen
                }
            } else {
                return {
                    ...propiedad,
                    imagen: ''
                }
            }
        });
        res.render('admin/tasaciones', {layout: 'admin/layout', usuario: req.session.nombre, propiedades});
    } catch (error) {
        console.log(error);
        res.render('admin/tasaciones', {layout: 'admin/layout', usuario: req.session.nombre, propiedades: []});
    }
});

router.get('/agregar', function(req, res, next) {
    res.render('admin/agregar', {layout: 'admin/layout', usuario: req.session.nombre});
});

router.post('/agregar', async function(req, res, next) {
    try {
        let imgId = '';
        if (req.files && req.files.imagen && req.files.imagen.tempFilePath) {
            const uploadResult = await uploader(req.files.imagen.tempFilePath, {
                folder: 'inmobiliaria'
            });
            imgId = uploadResult.public_id;
        }

        await propiedadesModel.insertPropiedad({
            titulo: req.body.title,
            precio: req.body.price,
            direccion: req.body.address,
            descripcion: req.body.description,
            imagen: imgId
        });

        res.redirect('/admin/tasaciones');
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            error: true,
            message: `Error al guardar la propiedad: ${error.message}`
        });
    }
});

router.get('/modificar/:id', async function(req, res, next) {
    try {
        const propiedad = await propiedadesModel.getPropiedadById(req.params.id);
        if (!propiedad) {
            return res.redirect('/admin/tasaciones');
        }
        let imagenActual = '';
        if (propiedad.imagen) {
            imagenActual = cloudinary.image(propiedad.imagen, {
                width: 240,
                height: 140,
                crop: 'fill'
            });
        }
        res.render('admin/modificar', {layout: 'admin/layout', usuario: req.session.nombre, propiedad, imagenActual});
    } catch (error) {
        console.log(error);
        res.redirect('/admin/tasaciones');
    }
});

router.post('/modificar', async function(req, res, next) {
    try {
        let imgId = req.body.img_original || '';

        if (req.body.img_delete && req.body.img_original) {
            await destroy(req.body.img_original);
            imgId = '';
        }

        if (req.files && req.files.imagen && req.files.imagen.tempFilePath) {
            if (req.body.img_original) {
                await destroy(req.body.img_original);
            }
            const uploadResult = await uploader(req.files.imagen.tempFilePath, {
                folder: 'inmobiliaria'
            });
            imgId = uploadResult.public_id;
        }

        await propiedadesModel.updatePropiedadById({
            id: req.body.id,
            titulo: req.body.title,
            precio: req.body.price,
            direccion: req.body.address,
            descripcion: req.body.description,
            imagen: imgId
        });

        res.redirect('/admin/tasaciones');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            propiedad: {
                id: req.body.id,
                titulo: req.body.title,
                precio: req.body.price,
                direccion: req.body.address,
                descripcion: req.body.description,
                imagen: req.body.img_original
            },
            error: true,
            message: `Error al actualizar la propiedad: ${error.message}`
        });
    }
});

router.get('/eliminar/:id', async function(req, res, next) {
    try {
        const propiedad = await propiedadesModel.getPropiedadById(req.params.id);
        if (propiedad && propiedad.imagen) {
            await destroy(propiedad.imagen);
        }
        await propiedadesModel.deletePropiedadById(req.params.id);
        res.redirect('/admin/tasaciones');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/tasaciones');
    }
});

module.exports = router;