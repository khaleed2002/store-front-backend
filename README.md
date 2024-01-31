# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
# How to Run Project

### scripts
- npm run lint (to run eslint)
- npm run prettier (to run prettier)
- npm run build (compile typescript to javascript)
- npm run start (open server using nodemon)
- npm run pretest (build project and setup migration for testing)
- npm run test (test spec files)
- npm run posttest (drop migration)
### start server
1- npm run build
2- node dist/server.js

### ports
you can configure database port and server port from .env file
 - Database port:5432
 - Server port:3000
## important
 to run project you should:
 npm install( to install all needed packages) !important
 ### create .env file with these parameters
- DB_NAME=store_front_backend
- DB_NAME_TEST=store_front_backend_test
- DB_PASSWORD=
- DB_HOST=
- DB_USER=
- ENV=dev
- BCRYPT_PASSWORD = 
- SALT_ROUNDS=
- pepper=
- TOKEN_SECRET=
- SERVER_PORT=
- DB_PORT=
### create database and connect to it
- you cand create user using this 
  - CREATE USER username WITH PASSWORD password;
    - ex: CREATE USER khaled WITH PASSWORD 'khaled123';
- you should create database one for development and one for test using this query
  - CREATE DATABASE storefront_db;
  - CREATE DATABASE storefront_test_db;
- now Grant all database privileges to user in both databases
```sh
  GRANT ALL PRIVILEGES ON DATABASE storefront_db TO khaled;
  GRANT ALL PRIVILEGES ON DATABASE storefront_test_db TO khaled;
```
- check database relations ![alt text](https://github.com/khaleed2002/store-front-backend/blob/main/Database_Relations.PNG?raw=true)

## API Reference
#### create a user ( return JWT )

```
  post /users
  
  request body{
    username: value,
    password: value,
    firstname: value,
    lastname: value
  }
```
#### authenticate user ( return JWT )

```
  post /users/auth
  
  request body{
    username:value,
    password:value
  }
```

#### get all users 

```
  get /users
  - need barear Authentication(JWT)
```
#### get specific user

```
  get /users/:id
  - need barear Authentication(JWT)
```
#### delete user (return deleted user data)

```
  delete /users
  
  request body{
    id:value
  }
  - need barear Authentication(JWT)
```
------------------------------------------------------
#### create a product ( return created product )

```
  post /products
  
  request body{
    name: value,
    price: value,
    category: value,
  }
  - need barear Authentication(JWT)
```
#### show all products

```
  get /products
```
#### show specific product

```
  get /products/:id
```
#### delete product

```
  delete /products
  
  request body{
    id:value
  }
  - need barear Authentication(JWT)
```
#### get products by category

```
  get /products/category
  
  request body{
    category:value
  }
```
------------------------------------------------------
#### create an order ( return created order )

```
  post /users/:userid/orders
  
  request body{
    status: value,
  }
  - need barear Authentication(JWT)
```
#### add product to order ( return data about order & product )

```
  post /users/:userid/orders/:orderid
  
  request body{
    product_id: value,
    quantity: value
  }
  - need barear Authentication(JWT)
```
#### get current order

```
  get /users/:userid/orders/current

  - need barear Authentication(JWT)
```
#### get all orders( return data about order )

```
  get /orders

  - need barear Authentication(JWT)
```

