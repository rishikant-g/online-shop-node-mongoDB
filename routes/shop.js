const express = require('express');
const router = express.Router();

router.get("/", (req,res,next) => {
    console.log('home page');
});

module.exports = router;