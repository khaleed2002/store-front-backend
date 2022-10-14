CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password TEXT NOT NULL
);