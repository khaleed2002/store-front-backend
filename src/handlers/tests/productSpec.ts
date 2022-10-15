import supertest from 'supertest';
import client from '../../database';
import app from '../../server';
import productRoute from '../product';
import usersRoute from '../user';
usersRoute(app);
productRoute(app);
const request = supertest(app);
describe('test product API routes', () => {
  let token: string;
  beforeAll(async () => {
    await request.post('/users').send({
      username: 'khaled',
      password: 'khaled123',
      firstname: 'Khaled',
      lastname: 'Abdelrahman',
    });
    const response = await request
      .post('/users/auth')
      .send({ username: 'khaled', password: 'khaled123' });
    token = response.body;
  });
  it('test create product route', async () => {
    const response = await request
      .post('/products')
      .send({ name: 'mouse', price: 20, category: 'computer' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('mouse');
    expect(response.body.price).toEqual(20);
    expect(response.body.category).toEqual('computer');
  });
  it('test show product route', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('mouse');
    expect(response.body.price).toEqual(20);
    expect(response.body.category).toEqual('computer');
  });
  it('test index product route', async () => {
    await request
      .post('/products')
      .send({ name: 'laptop', price: 1000, category: 'computer' })
      .set('Authorization', `Bearer ${token}`);
    const response = await request.get('/products');
    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].name).toEqual('mouse');
    expect(response.body[0].price).toEqual(20);
    expect(response.body[0].category).toEqual('computer');
    expect(response.body[1].id).toEqual(2);
    expect(response.body[1].name).toEqual('laptop');
    expect(response.body[1].price).toEqual(1000);
    expect(response.body[1].category).toEqual('computer');
  });
  it('test delete product route', async () => {
    const response = await request
      .delete('/products')
      .send({ id: 2 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(2);
    expect(response.body.name).toEqual('laptop');
    expect(response.body.price).toEqual(1000);
    expect(response.body.category).toEqual('computer');
  });
  it('test show product route', async () => {
    const response = await request
      .get('/products/category')
      .send({ category: 'computer' });
    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].name).toEqual('mouse');
    expect(response.body[0].price).toEqual(20);
    expect(response.body[0].category).toEqual('computer');
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;
          \nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
          DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
});
