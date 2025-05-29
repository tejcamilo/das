import { jest } from '@jest/globals';

// Use unstable_mockModule for ESM mocking
await jest.unstable_mockModule('../src/models/citasModel.js', () => ({
  CitasModel: {
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
    find: jest.fn()
  }
}));

import * as citasController from '../src/controllers/citasController.js';
import { CitasModel } from '../src/models/citasModel.js';

describe('Citas Controller', () => {
  test('agendarCitas should call res.render', async () => {
    const req = {};
    const res = { render: jest.fn() };
    await citasController.agendarCitas(req, res);
    expect(res.render).toHaveBeenCalled();
  });

  test('updateCita should update cita and redirect', async () => {
    const req = { body: { citaId: '123' } };
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    // Mock DB responses
    CitasModel.findByIdAndUpdate.mockResolvedValue({});
    CitasModel.findById.mockResolvedValue({
      fecha: '2024-06-01',
      hora: '10:00',
      tipo: 'Consulta',
      modalidad: 'Presencial',
      profesional: 'Cathalina Cañon'
    });

    await citasController.updateCita(req, res);

    expect(CitasModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { disponible: false });
    expect(CitasModel.findById).toHaveBeenCalledWith('123');
    expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('/citas/agendar?'));
  });

  test('updateCita should handle errors', async () => {
    const req = { body: { citaId: '123' } };
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    CitasModel.findByIdAndUpdate.mockRejectedValue(new Error('DB error'));

    await citasController.updateCita(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error al agendar la cita');
  });
});
