const db = require('../db/queries');

async function getAllProducts(req, res) {
    try {
        const products = await db.getAllProducts();
        res.render('products', { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await db.getProductById(id);
        if (product) {
            res.render('product', { product });
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllProducts,
    getProductById,
};
