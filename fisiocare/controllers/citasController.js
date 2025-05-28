import { CitasModel } from '../models/citasModel.js';


export const index = async (req, res) => {
    try {
        res.render('citas/index');
    } catch (error) {
        console.log(error);
    }
}

export const agendarCitas = async (req, res) => {
    try {
        const data = await CitasModel.find();
        res.render('citas/agendar', { citas: data });
    } catch (error) {
        console.log(error);
    }
}

export const consultarCitas = async (req, res) => {
    try {
        const data = await CitasModel.find();
        res.render('citas/consultar', { citas: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateCita =  async (req, res) => {
    const { citaId } = req.body;
    try {
        await CitasModel.findByIdAndUpdate(citaId, { disponible: false });
        res.redirect('/citas/agendar');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agendar la cita');
    }
}
