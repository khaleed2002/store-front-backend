import {Product,ProductModel} from '../product';
import client from '../../database';

const product= new ProductModel();

describe("Product Model", () => {
    it('should have an index method', () => {
      expect(product.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(product.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(product.create).toBeDefined();
    });
  
    it('should have a update method', () => {
      expect(product.update).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(product.delete).toBeDefined();
    });
  });

let mouse:Product={
    name:'mouse',
    price:20,
    category:'computer'
};
describe('Test methods results in ProductModel',async()=>{
    it('create method should add a new product', async () => {
        const result = await product.create(mouse);
        expect(result).toEqual({
            id: 1,
            name:'mouse',
            price:20,
            category:'computer'
        });
    });
    
    it('index method should return a list of products', async () => {
        const result = await product.index();
        expect(result).toEqual([{
            id: 1,
            name:'mouse',
            price:20,
            category:'computer'
        }]);
    });
    
    it('show method should return the correct product', async () => {
        const result = await product.show(1);
        expect(result).toEqual({
            id: 1,
            name:'mouse',
            price:20,
            category:'computer'
        });
    });
    
    it('update method should update a product', async()=>{
        mouse.id=1;
        mouse.price=25;
        const result= await product.update(mouse);
        expect(result).toEqual({
            id: 1,
            name:'mouse',
            price:25,
            category:'computer'
        })
    });
    
    const burger:Product={
        name:'burger',
            price:10,
            category:'food'
    }
    it('get product by category',async () => {
        product.create(burger);
        const result =await product.getProductsByCategory('computer');
        expect(result).toEqual([{
            id: 1,
            name:'mouse',
            price:25,
            category:'computer'
        }]);
    })
    it('delete method should remove the product', async () => {
        await product.delete(1);
        await product.delete(2);
        const result = await product.index()
        expect(result).toEqual([]);
    });
});

afterAll(async()=>{
    const conn =await client.connect();
    const sql = `DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;
    \nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
    DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
});