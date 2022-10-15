import supertest from 'supertest';
import app from '../../server';
import usersRoute from '../user';
usersRoute(app)
const request = supertest(app);
describe('test user API routes', () => {
  let token:string;
  beforeAll(async () => {
    await request.post('/users').send({
      username: "khaled",
    password: "khaled123",
    firstname: "Khaled",
    lastname: "Abdelrahman"
    });
    const response = await request.post('/users/auth').send({username:"khaled",password:"khaled123"});
    token = response.body;
  });
    it('Test create user route', async () => {
      const response = await request.post('/users').send({
        username: "ali",
      password: "ali123",
      firstname: "Ali",
      lastname: "Ahmed"
      });
      expect(response.status).toEqual(201)//created
    });
    it('Test show user route',async()=>{
      const response = await request.get('/users/2').set('Authorization', `Bearer ${token}`);
      expect(response.body.username).toEqual("ali");
      expect(response.body.id).toEqual(2);
      expect(response.body.firstname).toEqual("Ali");
      expect(response.body.lastname).toEqual("Ahmed");
    })
    it('Test index user route',async()=>{
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.body[0].username).toEqual("khaled");
      expect(response.body[0].id).toEqual(1);
      expect(response.body[0].firstname).toEqual("Khaled");
      expect(response.body[0].lastname).toEqual("Abdelrahman");
      expect(response.body[1].username).toEqual("ali");
      expect(response.body[1].id).toEqual(2);
      expect(response.body[1].firstname).toEqual("Ali");
      expect(response.body[1].lastname).toEqual("Ahmed");
    });
    it('test delete user route',async()=>{
      let response= await request.delete('/users').send({id:2}).set('Authorization', `Bearer ${token}`);
      expect(response.body.username).toEqual("ali");
      response=await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.body.length).toEqual(1);
    });
    it('test authenticate user route',async()=>{
      const response = await request.post('/users/auth').send({username:"khaled",password:"khaled123"});
      expect(response.status).toEqual(200);
      expect(response.body).not.toEqual(null);
    })
    it('test authenticate user route failure',async()=>{
      const response = await request.post('/users/auth').send({username:"khaled",password:"12345"});
      expect(response.status).toEqual(401);
      expect(response.body).toEqual(null);
    })

  });