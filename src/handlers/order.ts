import express ,{Request,Response} from 'express';
import { Product,ProductModel } from '../models/product';
import dotenv from 'dotenv';
import { verifyAuthToken } from './user';
import { Order,OrderModel } from '../models/order';

const order=new OrderModel();

const create = async(req:Request,res:Response)=>{
    try{
        const newOrder:Order={
            status:req.body.status,
            user_id:parseInt(req.params.userid),
        };
        const result_newOrder=await order.create(newOrder);
        res.status(201).json(result_newOrder);
    }catch(err){
        res.status(400).json(err)
    }
};
const currentOrder=async(req:Request,res:Response)=>{
    try{
        const currentOrder=await order.currentOrder(parseInt(req.params.userid));
        res.json(currentOrder);
    }catch(err){
        res.status(400).json(err)
    }
}
const index=async(_req:Request,res:Response)=>{
    const allOrders=await order.index();
    res.json(allOrders);
};
const addProductToOrder=async(req:Request,res:Response)=>{
    try{
        const addedProduct=await order.addProductToOrder(
            parseInt(req.params.orderid),
            req.body.product_id,
            req.body.quantity
        );
        res.status(201).json(addedProduct);
    }catch(err){
        res.status(400).json(err)
    }
};

export const orderRoute=express.Router();
orderRoute.route('/users/:userid/orders/current').get(verifyAuthToken,currentOrder);
orderRoute.route('/orders').get(verifyAuthToken,index);
orderRoute.route('/users/:userid/orders').post(verifyAuthToken,create);
orderRoute.route('/users/:userid/orders/:orderid').post(verifyAuthToken,addProductToOrder);
