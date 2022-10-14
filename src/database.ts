import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_NAME_TEST } =
  process.env;
let client = new Pool();
if (ENV === 'dev') {
  client = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
} else if (ENV === 'test') {
  client = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
  });
}
export default client;
