import { Schema, model } from "mongoose";

const usuariosSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    tipoUsuario: { type: String, required: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true }
});

const UsuariosModel = model('usuarios', usuariosSchema);

export { UsuariosModel };
