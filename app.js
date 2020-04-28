const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRotues = require('./routes/shop');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');


const MONGODBURI = 'mongodb+srv://rishi:Risheekant@123@cluster0-esohe.mongodb.net/test';
var store = new MongoDBStore({   // The store will be used to store session in database;
    uri: MONGODBURI,
    collection: 'sessions'
  });

app.use(bodyParse.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

// Initializing session 
app.use(session({
    secret: 'This is a secret',
    store: store,
    resave: true,
    saveUninitialized: true
  }));
  
const csrfProtection= csrf();
app.use(csrfProtection);
app.use(flash());
app.set('view engine','ejs');
app.set('views','views');

// Adding csrf token  isLogin is set at time when user logged in auth controller
app.use((req,res,next) => {
 res.locals.isAuthenticated = req.session.isLogin;
 res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin',adminRoutes);
app.use(shopRotues);
app.use(authRoutes);


mongoose.connect(MONGODBURI,{ useUnifiedTopology: true,useNewUrlParser: true })
    .then( () => {
        app.listen(3000);
        console.log('Server started');
    })
    .catch(err => {
        console.log("unable to connect to database");
    })

