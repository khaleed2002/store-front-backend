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

#### products

| Field    | Type             | Special Attributes |
| -------- | ---------------- | ------------------ |
| **id**   | **Serial**       | **Primary Key**    |
| **name** | **VARCHAR** | **N/A**            |
| **price** | **INTEGER** | **N/A**            |
| **category** | **VARCHAR** | **N/A**            |

#### orders

| Field     | Type             | Special Attributes |
| --------- | ---------------- | ------------------ |
| **id**    | **Serial**       | **Primary Key**    |
| **user_id** | **INTEGER** | **Foreign Key**            |
| **status** | **VARCHAR(10)**      | **N/A**    |

#### orders_products

| Field          | Type        | Special Attributes |
| -------------- | ----------- | ------------------ |
| **id**         | **Serial**  | **Primary Key**    |
| **order_id** | **INTEGER NOT NULL** | **Foreign Key**    |
| **product_id** | **INTEGER NOT NULL** | **Foreign Key**    |
| **quantity** | **INTEGER NOT NULL** | **N/A**    |




