import { UsuariosModel } from '../models/usuariosModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const iniciarSesion = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const usuario = await UsuariosModel.findOne({ correo: correo });
        
        if (!usuario) {
            return res.redirect('/usuarios/iniciar-sesion?error=Usuario no encontrado');
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.redirect('/usuarios/iniciar-sesion?error=Contraseña incorrecta');
        }

        const token = jwt.sign(
            { id: usuario._id, tipoUsuario: usuario.tipoUsuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/?success=1');
    } catch (error) {
        console.log(error);
        res.redirect('/usuarios/iniciar-sesion?error=Error al iniciar sesión');
    }
}

export const cerrarSesion = (req, res) => {
    try {
        res.clearCookie('jwt');
        res.redirect('/usuarios/iniciar-sesion');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cerrar sesión');
    }
}

export const consultarUsuarios = async (req, res) => {
    try {
        if (req.usuario.tipoUsuario !== 'administrador') {
            return res.status(403).send('Acceso no autorizado');
        }

        const usuarios = await UsuariosModel.find();
        res.render('usuarios/consultar', { usuarios });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al consultar usuarios');
    }
}

export const modificarUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    const { nombre, apellido, correo, telefono, tipoUsuario } = req.body;
    
    try {
        if (req.usuario.tipoUsuario !== 'administrador' && req.usuario._id !== usuarioId) {
            return res.status(403).send('Acceso no autorizado');
        }

        const usuarioActualizado = await UsuariosModel.findByIdAndUpdate(
            usuarioId,
            { nombre, apellido, correo, telefono, tipoUsuario },
            { new: true }
        );

        const params = new URLSearchParams({
            success: 1,
            nombre: usuarioActualizado.nombre,
            correo: usuarioActualizado.correo
        }).toString();

        res.redirect(`/usuarios/consultar?${params}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al modificar usuario');
    }
}
