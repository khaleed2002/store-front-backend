import express ,{Request,Response} from 'express';
import { User,UserModel } from '../models/user';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotenv.config();


const users=new UserModel();

const index=async(_req:Request,res:Response)=>{
    const allUsers=await users.index();
    res.json(allUsers);
};
const show=async(req:Request,res:Response)=>{
    const user=await users.show(parseInt(req.params.id));
    res.json(user);
};
const create=async(req:Request,res:Response)=>{
    try{
        const Username:string=req.body.username;
        const  Password:string=req.body.password;
        const Firstname:string=req.body.firstname;
        const Lastname:string=req.body.lastname;
        const newUser:User={
            username:Username,
            password:Password,
            firstname:Firstname,
            lastname:Lastname
        };
        const result=await users.create(newUser);
        const JWT=jwt.sign({user:{
            Username
        }} ,(process.env.TOKEN_SECRET as unknown) as Secret);
        res.status(201).json(JWT)
    } catch(err){
        res.status(400);
        res.json(err);
    }   
};

const destroy=async(req:Request,res:Response)=>{
    const deleted=await users.delete(req.body.id);
    res.json(deleted);
};
export const authenticate=async(req:Request,res:Response)=>{
    const userName:string= req.body.username;
    const password:string=req.body.password;
    const token =await users.authenticate(userName,password);
    res.json(token);
};

export const verifyAuthToken = (req: Request, res: Response, next:express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader===undefined){
            return res.status(401).json(`authorization Failed`).errored;
        }
        const token = ((authorizationHeader as unknown) as string).split(' ')[1];
        if(token){
            jwt.verify(token, (process.env.TOKEN_SECRET as unknown) as Secret,(err,decoded)=>{
                if(err){
                    return res.status(401).json(`authorization failed: Invalid token`);
                } else{
                    next();
                }
            });
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

const usersRoute=(app:express.Application)=>{
    app.get('/users',verifyAuthToken,index);
    app.post('/users',create);
    app.get('/users/:id',verifyAuthToken,show);
    app.delete('/users',verifyAuthToken,destroy);
    app.post('/users/auth',authenticate);
};
export default usersRoute;