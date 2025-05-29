class UsuariosController {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }

    // Muestra la página principal de usuarios
    async index(req, res) {
        try {
            if (req.session.usuario?.tipoUsuario !== 'administrador') {
                return res.status(403).render('error', { mensaje: 'Acceso no autorizado' });
            }
            res.render('usuarios/index');
        } catch (error) {
            console.error('Error al cargar índice de usuarios:', error);
            res.status(500).render('error', { mensaje: 'Error al cargar página' });
        }
    }

    // Muestra formulario de registro (GET)
    async registrarUsuario(req, res) {
        try {
            res.render('usuarios/registrar');
        } catch (error) {
            console.error('Error al mostrar formulario de registro:', error);
            res.status(500).render('error', { mensaje: 'Error al cargar formulario' });
        }
    }

    // Procesa el registro (POST) - Ya existente
    async crearUsuario(req, res) {
        try {
            const { nombre, correo, telefono, password } = req.body;
            
            if (req.body.confirmPassword && req.body.confirmPassword !== password) {
                return res.status(400).render('usuarios/registrar', { error: 'Las contraseñas no coinciden' });
            }

            const nuevoUsuario = {
                nombre,
                correo,
                telefono,
                password,
                tipoUsuario: 'paciente'
            };

            await this.usuariosModel.crear(nuevoUsuario);
            res.redirect(`/usuarios/iniciar-sesion?success=1&nombre=${encodeURIComponent(nombre)}`);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).render('usuarios/registrar', { error: 'Error al registrar usuario' });
        }
    }

    // Consulta usuarios (GET) - Ya existente (consultarUsuarios)
    async consultarUsuarios(req, res) {
        try {
            if (req.session.usuario?.tipoUsuario !== 'administrador') {
                return res.status(403).render('error', { mensaje: 'Acceso no autorizado' });
            }

            const usuarios = await this.usuariosModel.obtenerTodos();
            res.render('usuarios/consultar', { usuarios });
        } catch (error) {
            console.error('Error al consultar usuarios:', error);
            res.status(500).render('error', { mensaje: 'Error al cargar usuarios' });
        }
    }

    // Iniciar sesión (POST) - Ya existente
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

    // Cerrar sesión (POST) - Ya existente
    async cerrarSesion(req, res) {
        try {
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.status(500).send('Error al cerrar sesión');
        }
    }

    // Modificar usuario (POST) - Ya existente
    async modificarUsuario(req, res) {
        try {
            const { usuarioId } = req.params;
            const datosActualizados = req.body;

            if (req.session.usuario?.tipoUsuario !== 'administrador' && req.session.usuario?.id !== usuarioId) {
                return res.status(403).send('No autorizado');
            }

            await this.usuariosModel.actualizar(usuarioId, datosActualizados);
            res.redirect(`/usuarios/consultar?success=1`);
        } catch (error) {
            console.error('Error al modificar usuario:', error);
            res.status(500).redirect(`/usuarios/modificar/${usuarioId}?error=Error al actualizar`);
        }
    }

    // Eliminar usuario (POST) - Nuevo método
    async eliminarUsuario(req, res) {
        try {
            const { usuarioId } = req.params;

            if (req.session.usuario?.tipoUsuario !== 'administrador') {
                return res.status(403).send('No autorizado');
            }

            await this.usuariosModel.eliminar(usuarioId);
            res.redirect('/usuarios/consultar?success=1');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).redirect('/usuarios/consultar?error=Error al eliminar usuario');
        }
    }
}

export default UsuariosController;
