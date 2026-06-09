const db = require('../db/queries');

async function getHomePage(req, res) {
    try {
        const totalCategories = await db.getTotalCategories();
        const totalProducts = await db.getTotalProducts();
        res.render('index', { totalCategories, totalProducts });
    } catch (error) {
        console.error("Error fetching data for home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getHomePage
};
   