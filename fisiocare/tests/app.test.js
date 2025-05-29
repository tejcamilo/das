import request from 'supertest';
import server from '../src/app.js';
import mongoose from 'mongoose';

describe('Citas routes', () => {
  test('GET /citas should render citas/index', async () => {
    const res = await request(server).get('/citas');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Citas'); // or some text from your index.ejs
  });

  test('GET /citas/agendar should render citas/agendar', async () => {
    const res = await request(server).get('/citas/agendar');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Agendar'); // or some text from your agendar.ejs
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});