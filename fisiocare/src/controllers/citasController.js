import { CitasModel } from '../models/citasModel.js';


export const index = async (req, res) => {
    try {
        res.render('citas/index', { title: 'Citas' });
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
        console.log('Cita agendada:', citaId);
        res.redirect('/citas/agendar');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agendar la cita');
    }
}

export const cancelarCita = async (req, res) => {
    const { citaId } = req.body;
    try {
        await CitasModel.findByIdAndUpdate(citaId, { disponible: true });
        console.log('Cita cancelada:', citaId);
        res.redirect('/citas/consultar');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agendar la cita');
    }
}

export const reagendarCita = async (req, res) => {
    const { citaId } = req.body;
    try {
        await CitasModel.findByIdAndUpdate(citaId, { disponible: true });
        console.log('Cita cancelada (reagendar):', citaId);
        res.redirect('/citas/agendar');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agendar la cita');
    }
}