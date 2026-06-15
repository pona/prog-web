var express = require('express');
var router = express.Router();
var tasacionesModel = require('./../models/tasacionesModel');
var cloudinary = require('cloudinary').v2;

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

module.exports = router;