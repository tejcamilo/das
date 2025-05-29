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
        res.render('citas/agendar', { citas: data, req });
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
        const cita = await CitasModel.findById(citaId);
        const params = new URLSearchParams({
          success: 1,
          fecha: cita.fecha,
          hora: cita.hora,
          tipo: cita.tipo,
          modalidad: cita.modalidad,
          profesional: cita.profesional
        }).toString();

        res.redirect(`/citas/agendar?${params}`);
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

export const administrarCitas = async (req, res) => {
    try {
        const data = await CitasModel.find();
        res.render('admin/admin', { citas: data });
    } catch (error) {
        console.log(error);
    }
}

export const listaCitas = async (req, res) => {
    try {
        const data = await CitasModel.find();
        res.render('admin/citas', { citas: data });
    } catch (error) {
        console.log(error);
    }
}

export const mostrarModificarCita = async (req, res) => {
  try {
    const cita = await CitasModel.findById(req.params.citaId);
    res.render('admin/modificar', { cita });
  } catch (error) {
    res.status(500).send('Error al cargar la cita');
  }
};

export const modificarCita = async (req, res) => {
  try {
    await CitasModel.findByIdAndUpdate(req.params.citaId, req.body);
    res.redirect('/citas/admin/modificar');
    console.log('Cita modificada:', req.params.citaId);
  } catch (error) {
    res.status(500).send('Error al modificar la cita');
  }
};

export const eliminarCita = async (req, res) => {
  try {
    await CitasModel.findByIdAndDelete(req.params.citaId);
    console.log('Cita eliminada:', req.params);
    res.redirect('/citas/admin/modificar');
  } catch (error) {
    res.status(500).send('Error al eliminar la cita');
  }
};

export const mostrarCrearCita = (req, res) => {
  res.render('admin/crear');
};

export const crearCita = async (req, res) => {
  try {
    await CitasModel.create(req.body);
    res.redirect('/citas/admin/modificar');
  } catch (error) {
    res.status(500).send('Error al crear la cita');
  }
};
