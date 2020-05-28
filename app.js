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
const multer = require('multer'); // for file upload 
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
 


// File upload configuration start 
const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'images');
  },
  filename: (req,file,cb) => {
    cb(null,uuidv4()+file.originalname);
  }
});

const fileFilter = (req,file,cb) => {
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

// File upload configuration end



const MONGODBURI = 'mongodb+srv://rishi:Risheekant@123@cluster0-esohe.mongodb.net/test';
var store = new MongoDBStore({   // The store will be used to store session in database;
    uri: MONGODBURI,
    collection: 'sessions'
  });

app.use(bodyParse.urlencoded({extended:true}));

app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image')); // image is the name of input field in form

app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));

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

