const {Router} = require('express');
const productRouter = Router();
const productController = require('../controllers/productController');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/new_product', productController.getNewProductForm);
productRouter.get('/:id', productController.getProductById);

productRouter.post('/new_product', productController.createProduct);
productRouter.post('/:id/delete', productController.deleteProduct);

module.exports = productRouter;