const {Router} = require('express');
const indexRouter = Router();
const indexController = require('../controllers/homeController');

indexRouter.get('/', indexController.getHomePage);

module.exports = indexRouter;
