class CitasModel {
    constructor() {
        this.citas = []; // Array to hold citas data
    }

    // Method to fetch all citas
    getAllCitas() {
        return this.citas;
    }

    // Method to create a new cita
    createCita(cita) {
        this.citas.push(cita);
        return cita;
    }

    // Method to delete a cita by id
    deleteCita(id) {
        const index = this.citas.findIndex(cita => cita.id === id);
        if (index !== -1) {
            return this.citas.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = CitasModel;