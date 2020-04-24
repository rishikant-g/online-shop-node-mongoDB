const express = require('express');
const router = express.Router();
const productController = require('../constrollers/admin/productController');

router.get('/products',productController.getProducts);

router.get('/add-product',productController.getAddProduct);

router.post('/add-product',productController.postAddProduct);

router.post('/update-product',productController.postUpdateProduct);

router.post('/delete-product',productController.postDeleteProduct);

router.get('/edit-product/:productId',productController.getEditProduct);

router.get('/get-single-product/:productId',productController.getSingleProduct);

module.exports = router;