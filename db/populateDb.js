const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

async function main() {
  try {
    console.log("seeding...");
    const client = new Client({
      connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    });

    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR (255) NOT NULL
        );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(20),
        description TEXT,
        price INTEGER,
        stock INTEGER default 0,
        image_url TEXT,
        category_id INTEGER,
        FOREIGN KEY (category_id)
            REFERENCES categories(id)
            ON DELETE SET NULL
        );
    `);

    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    const products = data.products;

    const categories = new Set();

    for (const product of products) {
        categories.add(product.category);
    }

    console.log(categories);
    for (const category of categories) {
        await client.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
        `, [category]);
    }

    for (const product of products) {
        const { title, description, price, stock, thumbnail, category } = product;
        const categoryId = await client.query(`
            SELECT id FROM categories WHERE name = $1
        `, [category]);

        await client.query(`
            INSERT INTO products (name, description, price, stock, image_url, category_id)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [title, description, price, stock, thumbnail, categoryId]);
    }

    await client.end();
    console.log("done");

  } catch (err) {
    console.error(err);
  }
}

main();
