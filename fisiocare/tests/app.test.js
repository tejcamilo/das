import request from 'supertest';
import server from '../src/app.js';
import mongoose from 'mongoose';

describe('Citas routes', () => {
  test('GET /citas should redirect to /login if not logged in', async () => {
    const res = await request(server).get('/citas');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/login');
  });

  test('GET /login should render /login', async () => {
    const res = await request(server).get('/login');
    expect(res.statusCode).toBe(200); 
    expect(res.text).toContain('Iniciar Sesión');
  });

  test('GET /citas/agendar should render agendar page', async () => {
    const res = await request(server).get('/citas/agendar');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Agendar Citas');
  });

  test('GET /citas/consultar should render consultar page', async () => {
    const res = await request(server).get('/citas/consultar');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Citas'); 
  });

  test('POST /citas/agendar should redirect (not logged in)', async () => {
    const res = await request(server).post('/citas/agendar').send({});
    // If protected, should redirect to login
    expect([302, 401, 403]).toContain(res.statusCode);
  });

  test('GET /citas/admin should redirect to /login if not logged in', async () => {
    const res = await request(server).get('/citas/admin');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/login');
  });

  test('GET /logout should redirect to /login', async () => {
    const res = await request(server).get('/logout');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/login');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});