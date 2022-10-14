import client from '../database';

export type Product={
    id?:number;
    name?:string;
    price?:number;
    category?:string;
}

export class ProductModel{

    async index():Promise<Product[]>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM products';
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(
                `Failed to get products with following error:${err}`
            );
        }
    };
    async show(product_id:number):Promise<Product>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM products WHERE id=$1';
            const result=await conn.query(sql,[product_id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(
                `Failed to get product with following error:${err}`
            );
        }
    };
    async create(product:Product):Promise<Product>{
        try{
            const conn=await client.connect();
            const sql='INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *';
            const result=await conn.query(sql,[product.name,product.price,product.category]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(
                `Failed to create product with following error:${err}`
            );
        }
    };
    async update(product:Product):Promise<Product>{
        try{
            const conn=await client.connect();
            const sql='UPDATE products SET price=$1 WHERE id=$2 RETURNING *';
            const result=await conn.query(sql,[product.price,product.id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(
                `Failed to update product with following error:${err}`
            );
        }
    }
    async delete(product_id:number):Promise<Product>{
        try{
            const conn=await client.connect();
            const sql='DELETE FROM products WHERE id=$1 RETURNING *';
            const result=await conn.query(sql,[product_id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(
                `Failed to delete product with following error:${err}`
            );
        }
    }
    async getProductsByCategory(category:string):Promise<Product[]>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM products WHERE category= $1 ';
            const result=await conn.query(sql,[category]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(
                `Failed to get products with following error:${err}`
            );
        }
    }
}