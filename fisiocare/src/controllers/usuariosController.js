class UsuariosController {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }

    async registrarUsuario(req, res) {
        try {
            const { nombre, correo, telefono, password } = req.body;
            
            if (req.body.confirmPassword && req.body.confirmPassword !== password) {
                return res.status(400).send('Las contraseñas no coinciden');
            }

            const nuevoUsuario = {
                nombre,
                correo,
                telefono,
                id,
                password,
                tipoUsuario: 'paciente'
            };

            await this.usuariosModel.crear(nuevoUsuario);
            res.redirect(`/usuarios/iniciar-sesion?success=1&nombre=${encodeURIComponent(nombre)}`);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).redirect('/usuarios/registrar?error=Error al registrar usuario');
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { correo, password } = req.body;
            const usuario = await this.usuariosModel.buscarPorCorreo(correo);

            if (!usuario) {
                return res.redirect('/usuarios/iniciar-sesion?error=Usuario no encontrado');
            }

            const contraseñaValida = await this.usuariosModel.validarContraseña(password, usuario.password);
            
            if (!contraseñaValida) {
                return res.redirect('/usuarios/iniciar-sesion?error=Contraseña incorrecta');
            }

            req.session.usuario = {
                id: usuario.id,
                nombre: usuario.nombre,
                tipoUsuario: usuario.tipoUsuario
            };

            res.redirect('/perfil');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).redirect('/usuarios/iniciar-sesion?error=Error al iniciar sesión');
        }
    }

    async cerrarSesion(req, res) {
        try {
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.status(500).send('Error al cerrar sesión');
        }
    }

    async consultarUsuarios(req, res) {
        try {
            if (req.session.usuario?.tipoUsuario !== 'administrador') {
                return res.status(403).render('error', { mensaje: 'Acceso no autorizado' });
            }

            const usuarios = await this.usuariosModel.obtenerTodos();
            res.render('usuarios/lista', { usuarios });
        } catch (error) {
            console.error('Error al consultar usuarios:', error);
            res.status(500).render('error', { mensaje: 'Error al cargar usuarios' });
        }
    }

    async modificarUsuario(req, res) {
        try {
            const { id } = req.params;
            const datosActualizados = req.body;

            if (req.session.usuario?.tipoUsuario !== 'administrador' && req.session.usuario?.id !== id) {
                return res.status(403).send('No autorizado');
            }

            await this.usuariosModel.actualizar(id, datosActualizados);
            res.redirect(`/usuarios/${id}?success=1`);
        } catch (error) {
            console.error('Error al modificar usuario:', error);
            res.status(500).redirect(`/usuarios/${id}/editar?error=Error al actualizar`);
        }
    }
}

export default UsuariosController;
