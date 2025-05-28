class CitasModel {
    constructor() {
        this.citas = []; 
        this.currentId = 1; 
    }

    getAllCitas() {
        return this.citas;
    }

    getCitaById(id) {
        return this.citas.find(cita => cita.id === id);
    }

    createCita(cita) {
        if (!cita.id) {
            cita.id = this.currentId++;
        }
        this.citas.push(cita);
        return cita;
    }

    updateCita(id, updatedData) {
        const cita = this.getCitaById(id);
        if (cita) {
            Object.assign(cita, updatedData);
            return cita;
        }
        return null;
    }

    deleteCita(id) {
        const initialLength = this.citas.length;
        this.citas = this.citas.filter(cita => cita.id !== id);
        return initialLength !== this.citas.length;
    }
}

module.exports = CitasModel;
