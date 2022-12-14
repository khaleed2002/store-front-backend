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

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

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

