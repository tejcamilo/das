class UsuariosController {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }

    async getUsuarios(req, res) {
        try {
            const usuarios = await this.usuariosModel.fetchAll();
            res.render('usuarios/index', { usuarios });
        } catch (error) {
            res.status(500).send('Error fetching usuarios');
        }
    }

    async createUsuario(req, res) {
        try {
            const newUsuario = req.body;
            await this.usuariosModel.save(newUsuario);
            res.redirect('/usuarios');
        } catch (error) {
            res.status(500).send('Error creating usuario');
        }
    }

    async deleteUsuario(req, res) {
        try {
            const usuarioId = req.params.id;
            await this.usuariosModel.delete(usuarioId);
            res.redirect('/usuarios');
        } catch (error) {
            res.status(500).send('Error deleting usuario');
        }
    }
}

export default UsuariosController;