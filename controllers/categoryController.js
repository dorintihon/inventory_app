const db = require('../db/queries');

async function getAllCategories(req, res) {
    try {
        const categories = await db.getAllCategories();
        res.render('categories', {categories});
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getCategoryById(req, res) {
    const categoryId = req.params.id;
    try {
        const category = await db.getCategoryById(categoryId);
        const products = await db.getProductsByCategoryId(categoryId);
        if (category) {
            res.render('category', {category, products});
        } else {
            res.status(404).send("Category not found");
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = {
    getAllCategories,
    getCategoryById,
};