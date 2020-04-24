const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRotues = require('./routes/shop');
const app = express();

const MongoClient = require('./utils/database').MongoConnect;


app.use(bodyParse.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views','views');

app.use("/a",(req,res,next) => {
    res.render('404',{
       pageTitle: '404',
       path: '/none'
    });
});

app.use('/admin',adminRoutes);
app.use(shopRotues);



MongoClient(() => {
    app.listen(3000);
});

