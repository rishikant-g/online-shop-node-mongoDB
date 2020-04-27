const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRotues = require('./routes/shop');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');


app.use(bodyParse.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views','views');


app.use('/admin',adminRoutes);
app.use(shopRotues);
app.use(authRoutes);


// app.use((req,res,next) => {
//     UserModel.findOne("5ea678bd4958dd18b04216a0")
//     .then(user => {
//         res.user = user,
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });

mongoose.connect('mongodb+srv://rishi:Risheekant@123@cluster0-esohe.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true })
    .then( () => {
        app.listen(3000);
        console.log('Server started');
    })
    .catch(err => {
        console.log(err);
    })

