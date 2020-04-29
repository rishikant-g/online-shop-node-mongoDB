const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const authController = require('../constrollers/auth/authController');

router.get('/sign-up',authController.getSignUp);

router.post('/sign-up',check('email').isEmail().withMessage('Invalid email format'),authController.postSignUp);

router.get('/login',authController.getLogin);

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/reset-password',authController.getReset);

router.post('/reset-password',authController.postReset);

router.get('/reset/:token',authController.getNewPassword);

router.post('/post-new-password',authController.postNewPassword);

module.exports = router;