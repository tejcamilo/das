const express = require('express');
const CitasController = require('../controllers/citasController');

const router = express.Router();
const citasController = new CitasController();

function setCitasRoutes(app) {
    router.get('/citas', citasController.getCitas.bind(citasController));
    router.post('/citas', citasController.createCita.bind(citasController));
    router.delete('/citas/:id', citasController.deleteCita.bind(citasController));

    app.use('/api', router);
}

module.exports = setCitasRoutes;