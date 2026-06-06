const {Router} = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);

module.exports = categoryRouter;