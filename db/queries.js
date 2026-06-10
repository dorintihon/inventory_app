const pool = require('./pool');

//Categories
async function getAllCategories() {
    const {rows} = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getTotalCategories() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM categories');
    return parseInt(rows[0].count, 10);
}


async function getCategoryById(id) {
    const {rows} = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
}

async function getProductsByCategoryId(categoryId) {
    const {rows} = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
    return rows;
}

async function createCategory(name) {
    await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
}

async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}


//Products
async function getAllProducts() {
    const { rows } = await pool.query(`
        SELECT
            products.*,
            categories.name AS category_name
        FROM products
        JOIN categories
        ON products.category_id = categories.id
    `);

    return rows;
}

async function getTotalProducts() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM products');
    return parseInt(rows[0].count, 10);
}

async function getProductById(id) {
    const { rows } = await pool.query(
        `
        SELECT
            products.*,
            categories.name AS category_name
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        WHERE products.id = $1
        `,
        [id]
    );

    return rows[0];
}

async function createProduct(name, description, price, stock, imageUrl, categoryId) {
    await pool.query(
        `
        INSERT INTO products (name, description, price, stock, image_url, category_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [name, description, price, stock, imageUrl, categoryId]
    );
}

async function deleteProduct(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
}


module.exports = {
    getAllCategories,
    getCategoryById,
    getProductsByCategoryId,
    getAllProducts,
    getProductById,
    getTotalCategories,
    getTotalProducts,
    createProduct,
    createCategory,
    deleteCategory,
    deleteProduct
};

