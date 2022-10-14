import {User,UserModel} from '../user';
import client from '../../database';
const user=new UserModel();

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(user.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });
});
let Khaled:User={
    firstname:'Khaled',
    lastname:'Elgamal',
    username:'Khaled123',
    password:"khaled101010"
}
describe('Test methods results in UserModel',async()=>{
    it('create method should add a new user', async () => {
        const result = await user.create(Khaled);
        expect(result).toEqual({
            id: 1,
            firstname:'Khaled',
            lastname:'Elgamal',
            username:'Khaled123'
        });
    });
    
    it('index method should return a list of users', async () => {
        const result = await user.index();
        expect(result).toEqual([{
            id: 1,
            firstname:'Khaled',
            lastname:'Elgamal',
            username:'Khaled123'
        }]);
    });
    
    it('show method should return the correct user', async () => {
        const result = await user.show(1);
        expect(result).toEqual({
            id: 1,
            firstname:'Khaled',
            lastname:'Elgamal',
            username:'Khaled123'
        });
    });
    
    it('update method should update a user', async()=>{
        Khaled.id=1;
        Khaled.lastname='Abdelrahman';
        const result= await user.update(Khaled);
        expect(result).toEqual({
            id: 1,
            firstname:'Khaled',
            lastname:'Abdelrahman',
            username:'Khaled123'
        })
    });
    
    it('delete method should remove the user', async () => {
        await user.delete(1);
        const result = await user.index()
        expect(result).toEqual([]);
    });
    it('authenticate user',async () => {
      const jwt=await user.authenticate('Khaled123','khaled101010');
      expect(jwt).not.toBeUndefined();
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