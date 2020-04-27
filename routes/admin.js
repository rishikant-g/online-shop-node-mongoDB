const express = require('express');
const router = express.Router();
const productController = require('../constrollers/admin/productController');
const isAuth = require('../middleware/isAuth');
router.get('/products',isAuth,productController.getProducts);

router.get('/add-product',isAuth,productController.getAddProduct);

router.post('/add-product',isAuth,productController.postAddProduct);

router.post('/update-product',isAuth,productController.postUpdateProduct);

router.post('/delete-product',isAuth,productController.postDeleteProduct);

router.get('/edit-product/:productId',isAuth,productController.getEditProduct);

router.get('/get-single-product/:productId',isAuth,productController.getSingleProduct);

module.exports = router;