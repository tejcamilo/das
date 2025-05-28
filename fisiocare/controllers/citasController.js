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

