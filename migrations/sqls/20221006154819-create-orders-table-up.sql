CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(10)
);