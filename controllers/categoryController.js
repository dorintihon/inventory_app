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

async function getNewCategoryForm(req, res) {
    res.render('forms/new_category');
}

async function createCategory(req, res) {
    const { name } = req.body;
    try {
        await db.createCategory(name);
        res.redirect('/categories');
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteCategory(req, res) {
    const categoryId = req.params.id;
    try {
        await db.deleteCategory(categoryId);
        res.redirect('/categories');
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getNewCategoryForm,
    createCategory,
    deleteCategory
};