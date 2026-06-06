const db = require('../db/queries');

async function getHomePage(req, res) {
    try {
        const categories = await db.getAllCategories();
        const products = await db.getAllProducts();
        res.render('index', {categories, products});
    } catch (error) {
        console.error("Error fetching data for home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getProductsPage(req, res) {
    try {
        const products = await db.getAllProducts();
        res.render('products', {products});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getHomePage,
    getProductsPage,
};