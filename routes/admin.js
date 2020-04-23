const express = require('express');
const router = express.Router();
const productController = require('../constrollers/admin/productController');

router.get('/products',productController.getProducts);

router.get('/add-product',productController.getAddProduct);

router.post('/add-product',productController.postAddProduct);

router.get('/edit-product/:productId',productController.getEditProduct);

module.exports = router;