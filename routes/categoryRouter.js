const {Router} = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/new_category', categoryController.getNewCategoryForm);
categoryRouter.get('/:id', categoryController.getCategoryById);

categoryRouter.post('/new_category', categoryController.createCategory);
categoryRouter.post('/:id/delete', categoryController.deleteCategory);

module.exports = categoryRouter;