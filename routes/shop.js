const express = require('express');
const router = express.Router();

router.get("/", (req,res,next) => {
    res.render("shop/index",{
        path: "/",
        pageTitle: "Home Page"
    });
});

module.exports = router;