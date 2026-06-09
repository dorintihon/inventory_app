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

module.exports = {
    getAllCategories,
    getCategoryById,
    getProductsByCategoryId,
    getAllProducts,
    getProductById,
    getTotalCategories,
    getTotalProducts
};

