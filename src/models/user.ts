import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config();
const { pepper, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password?: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT username,id,firstname,lastname FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to get users with following error: ${err}`);
    }
  }

  async show(user_id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT username,id,firstname,lastname FROM users WHERE id=($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to get user with following error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(username,firstname,lastname,password) VALUES(($1),($2),($3),($4)) RETURNING id,username,firstname,lastname';
      const hash = bcrypt.hashSync(
        (user.password as unknown as string) + pepper,
        parseInt(SALT_ROUNDS as unknown as string)
      );
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user with following error: ${err}`);
    }
  }
  async update(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users
                        SET firstname=$1, lastname=$2, password=$3
                        WHERE id=$4
                        RETURNING username,firstname,lastname,id`;
      const hash = bcrypt.hashSync(
        (user.password as unknown as string) + pepper,
        parseInt(SALT_ROUNDS as unknown as string)
      );
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash,
        user.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to create user with following error: ${err}`);
    }
  }
  async delete(user_id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete user with following error: ${err}`);
    }
  }
  async authenticate(
    username: string,
    password: string
  ): Promise<string | null> {
    const conn = await client.connect();
    const sql = 'select * from users where username=($1)';
    const result = await conn.query(sql, [username]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        const JWT = jwt.sign(
          {
            user: {
              username,
            },
          },
          process.env.TOKEN_SECRET as unknown as Secret
        );
        return JWT;
      }
    }
    return null;
  }
}
