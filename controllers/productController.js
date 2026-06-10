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

async function getNewProductForm(req, res) {
    try {
        const categories = await db.getAllCategories();
        res.render('forms/new_product', { categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function createProduct(req, res) {
    const { name, description, price, stock, image_url, category_id } = req.body;
    try {
        await db.createProduct(name, description, price, stock, image_url, category_id);
        res.redirect('/products');
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await db.deleteProduct(id);
        res.redirect('/products');
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getNewProductForm,
    deleteProduct
};
