import express ,{Request,Response} from 'express';
import { Product,ProductModel } from '../models/product';
import { verifyAuthToken } from './user';

const products=new ProductModel();

const index=async(_req:Request,res:Response)=>{
    const allProducts=await products.index();
    res.json(allProducts);
};

const show=async(req:Request,res:Response)=>{
    const product=await products.show(parseInt(req.params.id));
    res.json(product);
};

const destroy=async(req:Request,res:Response)=>{
    const deleted=await products.delete(req.body.id);
    res.json(deleted);
};

const getByCategory=async(req:Request,res:Response)=>{
    try{
        const allProductsByCat=await products.getProductsByCategory(req.body.category);
        return res.json(allProductsByCat);
    }catch(err){
        return res.status(400).json(err);
    }
};

const create=async(req:Request,res:Response)=>{
    try{
        const newProduct:Product={
            name:req.body.name,
            price:req.body.price,
            category:req.body.category
        };
        const result=await products.create(newProduct);
        res.status(201).json(result);
    }catch(err){
        res.status(400).json(err);
    }
};

const productRoute=(app:express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',verifyAuthToken,create);
    app.delete('/products',verifyAuthToken,destroy);
};
export const categoryRoute=express.Router()
categoryRoute.route('/category').get(getByCategory);
export default productRoute;
