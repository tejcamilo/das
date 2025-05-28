class CitasController {
    constructor(citasModel) {
        this.citasModel = citasModel;
    }

    async getCitas(req, res) {
        try {
            const citas = await this.citasModel.fetchAll();
            res.render('citas/index', { citas }); 
        } catch (error) {
            res.status(500).send('Error fetching citas');
        }
    }

    async createCita(req, res) {
        try {
            const newCita = req.body;
            await this.citasModel.save(newCita);
            res.redirect('/citas'); 
        } catch (error) {
            res.status(500).send('Error creating cita');
        }
    }

    async deleteCita(req, res) {
        try {
            const citaId = req.params.id;
            await this.citasModel.delete(citaId);
            res.redirect('/citas'); 
        } catch (error) {
            res.status(500).send('Error deleting cita');
        }
    }
}

export default CitasController; // Usa module.exports si es CommonJS
