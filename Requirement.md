# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show (args: product id)
- Delete [token required]
- Create [token required]
- Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create 
- Delete [token required]
- Authenticate (args:username,password) 

#### Orders

- Current Order by user (args: user id)[token required]
- Index => get all orders in system
- addProductToOrder [token required]
- Create [token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- username
- firstName
- lastName
- password

#### Orders

- id
- user_id
- status of order (active or complete)

#### orders_product
- id SERIAL PRIMARY KEY,
- order_id 
- product_id 
- quantity
## Database schema
#### users

| Field    | Type             | Special Attributes |
| -------- | ---------------- | ------------------ |
| **id**   | **Serial**       | **Primary Key**    |
| **username** | **VARCHAR UNIQUE NOT NULL** | **N/A**            |
| **firstname** | **VARCHAR(100)** | **N/A**            |
| **lastname** | **VARCHAR(100)** | **N/A**            |
| **password** | **TEXT NOT NULL** | **N/A**            |

- **users table from psql \d command:**
  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 username  | character varying      |           | not null |
 firstname | character varying(100) |           |          |
 lastname  | character varying(100) |           |          |
 password  | text                   |           | not null |
- Indexes:
    - "users_pkey" PRIMARY KEY, btree (id)
    - "users_username_key" UNIQUE CONSTRAINT, btree (username)
- Referenced by:
    - TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
#### products

| Field    | Type             | Special Attributes |
| -------- | ---------------- | ------------------ |
| **id**   | **Serial**       | **Primary Key**    |
| **name** | **VARCHAR** | **N/A**            |
| **price** | **INTEGER** | **N/A**            |
| **category** | **VARCHAR** | **N/A**            |

- **products table from psql \d command:**
  Column  |       Type        | Collation | Nullable |               Default
----------+-------------------+-----------+----------+--------------------------------------
 id       | integer           |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying |           |          |
 price    | integer           |           |          |
 category | character varying |           |          |
- Indexes:
    - "products_pkey" PRIMARY KEY, btree (id)
- Referenced by:
    - TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY  
    (product_id) REFERENCES products(id)
#### orders

| Field     | Type             | Special Attributes |
| --------- | ---------------- | ------------------ |
| **id**    | **Serial**       | **Primary Key**    |
| **user_id** | **INTEGER** | **Foreign Key**            |
| **status** | **VARCHAR(10)**      | **N/A**    |

- **orders table from psql \d command:**
Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer               |           |          |
 status  | character varying(10) |           |          |
- Indexes:
    - "orders_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    - "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
- Referenced by:
    - TABLE "orders_products" CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
#### orders_products

| Field          | Type        | Special Attributes |
| -------------- | ----------- | ------------------ |
| **id**         | **Serial**  | **Primary Key**    |
| **order_id** | **INTEGER NOT NULL** | **Foreign Key**    |
| **product_id** | **INTEGER NOT NULL** | **Foreign Key**    |
| **quantity** | **INTEGER NOT NULL** | **N/A**    |

- **orders_products table from psql \d command:**
   Column   |  Type   | Collation | Nullable |                   Default
------------+---------+-----------+----------+---------------------------------------------
 id         | integer |           | not null | nextval('orders_products_id_seq'::regclass)
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
 quantity   | integer |           | not null |
- Indexes:
    - "orders_products_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    - "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    - "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

