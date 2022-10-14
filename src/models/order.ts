import client from "../database";
import { Product } from "./product";

export type Order={
    id?:number;
    user_id?:number;
    status:string;
}

export class OrderModel{
    async index():Promise<Order[]>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM orders';
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(
                `Failed to get orders with following error:${err}`
            );
        }
    }
    async currentOrder(user_id:number):Promise<{}>{//here
        try{
            const conn = await client.connect();
            const sql1='SELECT id FROM orders WHERE user_id=$1';
            const result1=await conn.query(sql1,[user_id]);
            const lastOrder_id=result1.rows[result1.rows.length-1].id;
            const sql='SELECT order_id,product_id,quantity,status FROM orders o FULL OUTER JOIN orders_products o_p ON o.id=o_p.order_id WHERE order_id=$1';
            const result=await conn.query(sql,[lastOrder_id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(
                `Failed to get orders with following error:${err}`
            );
        }
    };
    async create(order:Order):Promise<Order>{
        try{
            const conn = await client.connect();
            const sql='INSERT INTO orders(user_id,status) VALUES($1,$2) RETURNING *';
            const result=await conn.query(sql,[order.user_id,order.status]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(
                `Failed to create orders with following error:${err}`
            );
        }
    };
    async addProductToOrder(order_id:number,product_id:number,quantity:number):Promise<{}>{
        try{
            const conn = await client.connect();
            let sql='INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
            await conn.query(sql,[order_id,product_id,quantity]);
            sql='SELECT product_id,order_id,name,category,price,quantity FROM products p FULL OUTER JOIN orders_products o_p ON p.id=o_p.product_id WHERE product_id=$1 AND order_id=$2';
            const result=await conn.query(sql,[product_id,order_id]);
            conn.release();
            return result.rows[result.rows.length-1];
        }catch(err){
            throw new Error(
                `Failed to create orders with following error:${err}`
            );
        }
    }

}