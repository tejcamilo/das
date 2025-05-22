const express = require('express');
const UsuariosController = require('../controllers/usuariosController');

const setUsuariosRoutes = (app) => {
    const router = express.Router();
    const usuariosController = new UsuariosController();

    router.get('/', usuariosController.getUsuarios.bind(usuariosController));
    router.post('/', usuariosController.createUsuario.bind(usuariosController));
    router.delete('/:id', usuariosController.deleteUsuario.bind(usuariosController));

    app.use('/usuarios', router);
};

module.exports = setUsuariosRoutes;