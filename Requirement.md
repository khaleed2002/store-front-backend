# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

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




