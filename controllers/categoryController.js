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
        const categories = await db.getAllCategories();
        const category = categories.find(c => c.id === parseInt(categoryId));
        if (category) {
            res.render('category', {category});
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
    getCategoryById
};