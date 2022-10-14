import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
describe('Test endpoint responses', () => {
    it('Test root response', async () => {
      const response = await request.get('/');
      expect(response.status).toEqual(200);
    });
    it('test users endpoint', async () => {
      const response = await request.get('/users');
      expect(response.status).toEqual(401);
    });
    it('test products endpoint', async () => {
      const response = await request.get('/products');
      expect(response.status).toEqual(200);
    });
    it('test orders endpoint', async () => {
      const response = await request.get('/orders');
      expect(response.status).toEqual(401);
    });
  });