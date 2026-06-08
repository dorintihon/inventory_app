const pool = require('./pool');

async function getAllCategories() {
    const {rows} = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllProducts() {
    const {rows} = await pool.query('SELECT * FROM products');
    
    return rows;
}

async function getCategoryById(id) {
    const {rows} = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
}

async function getProductsByCategoryId(categoryId) {
    const {rows} = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
    return rows;
}


module.exports = {
    getAllCategories,
    getAllProducts,
    getCategoryById,
    getProductsByCategoryId
};

