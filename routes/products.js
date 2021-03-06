const express = require('express');

const productsRouter = express.Router();
const productsMiddlewares = require('../middlewares/products');
const productsControllers = require('../controllers/productsControllers');
const errorMiddleware = require('../middlewares/error');

productsRouter.post(
  '/',
  productsMiddlewares.createProductValidation,
  productsControllers.createProduct,
);

productsRouter.get('/', productsControllers.getAllProducts);

productsRouter.get('/:id', productsControllers.getProductById);

productsRouter.put(
  '/:id',
  productsMiddlewares.createProductValidation,
  productsControllers.updateProduct,
);

productsRouter.delete('/:id', productsControllers.deleteProduct);

productsRouter.use(errorMiddleware);

module.exports = productsRouter;