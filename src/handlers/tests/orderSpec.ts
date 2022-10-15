import supertest from 'supertest';
import app from '../../server';
import usersRoute from '../user';
import client from '../../database';
import { orderRoute } from '../order';
import productRoute from '../product';
usersRoute(app);
productRoute(app);
app.use(orderRoute);
const request = supertest(app);

describe('test user API routes', () => {
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
    await request
      .post('/products')
      .send({ name: 'mouse', price: 20, category: 'computer' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/products')
      .send({ name: 'iPhone charger', price: 40, category: 'phone' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/products')
      .send({ name: 'iPhone 14', price: 1000, category: 'phone' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/products')
      .send({ name: 'Table', price: 110, category: 'home appliances' })
      .set('Authorization', `Bearer ${token}`);
    await request
      .post('/products')
      .send({ name: 'Al-Ahly new T-shirt', price: 30, category: 'clothes' })
      .set('Authorization', `Bearer ${token}`);
  });
  it('Test create order route', async () => {
    const response = await request
      .post('/users/1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'active',
      });
    expect(response.status).toEqual(201);
    expect(response.body.user_id).toEqual(1);
    expect(response.body.id).toEqual(1);
    expect(response.body.status).toEqual('active');
  });
  it('Test addProductToOrder route', async () => {
    const response = await request
      .post('/users/1/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: 2,
        quantity: 4,
      });
    expect(response.status).toEqual(201);
    expect(response.body.product_id).toEqual(2);
    expect(response.body.order_id).toEqual(1);
    expect(response.body.name).toEqual('iPhone charger');
    expect(response.body.category).toEqual('phone');
    expect(response.body.price).toEqual(40);
    expect(response.body.quantity).toEqual(4);
  });
  it('test current order route', async () => {
    //add another product to order
    await request
      .post('/users/1/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: 3,
        quantity: 1,
      });
    const response = await request
      .get('/users/1/orders/current')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].order_id).toEqual(1);
    expect(response.body[0].product_id).toEqual(2);
    expect(response.body[0].quantity).toEqual(4);
    expect(response.body[0].status).toEqual('active');
    expect(response.body[1].order_id).toEqual(1);
    expect(response.body[1].product_id).toEqual(3);
    expect(response.body[1].quantity).toEqual(1);
    expect(response.body[1].status).toEqual('active');
  });
  it('test index order route', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[0].status).toEqual('active');
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n
        DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        \nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;
        \nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;
        `;
    await conn.query(sql);
    conn.release();
  });
});
