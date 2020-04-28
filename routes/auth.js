const express = require('express');
const router = express.Router();
const authController = require('../constrollers/auth/authController');

router.get('/sign-up',authController.getSignUp);

router.post('/sign-up',authController.postSignUp);

router.get('/login',authController.getLogin);

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/reset-password',authController.getReset);

router.post('/reset-password',authController.postReset);

router.get('/reset/:token',authController.getNewPassword);

router.post('/post-new-password',authController.postNewPassword);

module.exports = router;