import { Order, OrderModel } from '../order';
import { User, UserModel } from '../user';
import { Product, ProductModel } from '../product';
import client from '../../database';

const order = new OrderModel();

describe('order Model', () => {
  it('should have an current orders method', () => {
    expect(order.currentOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have a add product method', () => {
    expect(order.addProductToOrder).toBeDefined();
  });
});


describe('Test methods results in order Model', async () => {
    let Khaled: User = {
        firstname: 'Khaled',
        lastname: 'Elgamal',
        username: 'Khaled123',
        password: 'khaled101010',
    };
    let products: Product[] = [
    {
        name: 'mouse',
        price: 20,
        category: 'computer',
    },
    {
        name: 'ipad',
        price: 20000,
        category: 'computer',
    },
    {
        name: 'labtop',
        price: 10000,
        category: 'computer',
    },
    ];
    let mouseOrder: Order = {
    user_id: 1,
    status: 'active',
    };
    const user = new UserModel();
    const product = new ProductModel();
    beforeAll(async () => {
        const conn = await client.connect();
        const sql = `DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
        DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
        DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
        await user.create(Khaled);
        await product.create(products[0]);
        await product.create(products[1]);
        await product.create(products[2]);
    
    });
    it('create method should add a new order', async () => {
        const result = await order.create(mouseOrder);
        expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
        });
    });
    it('create method should add product to order', async () => {
        const result = await order.addProductToOrder(1,1,3);
        expect(result).toEqual({
            product_id:1,order_id:1,name:'mouse',category:'computer',price:20,quantity:3
        });
    });
  it('currentOrders method should return a list of orders for specific user', async () => {
      await order.addProductToOrder(1,2,1);
      await order.addProductToOrder(1,3,4);
      const result = await order.currentOrder(1);
    expect(result).toEqual(
        [
            { order_id: 1, product_id: 1, quantity: 3, status: 'active' },
            { order_id: 1, product_id: 2, quantity: 1, status: 'active' },
            { order_id: 1, product_id: 3, quantity: 4, status: 'active' }
        ]
    );
  });
    afterAll(async () => {
        const conn = await client.connect();
        const sql = `DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
        DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
        DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    });
});


