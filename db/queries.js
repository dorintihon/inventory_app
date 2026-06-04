const pool = require('./pool');

async function getAllCategories() {
    const {rows} = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllProducts() {
    const {rows} = await pool.query('SELECT * FROM products');
    
    return rows;
}


module.exports = {
    getAllCategories,
    getAllProducts
};

getAllCategories();
getAllProducts();