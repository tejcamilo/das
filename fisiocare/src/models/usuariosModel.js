class UsuariosModel {
    constructor() {
        this.usuarios = [];
    }

    getAllUsuarios() {
        return this.usuarios;
    }

    getUsuarioById(id) {
        return this.usuarios.find(usuario => usuario.id === id);
    }

    createUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    deleteUsuario(id) {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    }
}

module.exports = UsuariosModel;