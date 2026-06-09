const {Router} = require('express');
const productRouter = Router();
const productController = require('../controllers/productController');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);

module.exports = productRouter;