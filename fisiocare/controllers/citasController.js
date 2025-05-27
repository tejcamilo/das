import { CitasModel } from '../models/citasModel.js';


export const index = async (req, res) => {
    try {
        res.render('citas/index');
    } catch (error) {
        console.log(error);
    }
}

export const getCitas = async (req, res) => {
    try {
        const data = await CitasModel.find();
        res.render('citas/citas', { citas: data });
    } catch (error) {
        console.log(error);
    }
}

