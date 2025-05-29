import { Schema, model } from "mongoose";

const citasSchema = new Schema({
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  tipo: { type: String, required: true },
  modalidad: { type: String, required: true },
  profesional: { type: String, required: true },
  disponible: { type: Boolean, default: true,  } 
});

const CitasModel = model('citas', citasSchema);

export { CitasModel };