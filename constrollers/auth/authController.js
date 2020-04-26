const getDb = require('../../utils/database').getDb;
const bcrypt = require('bcrypt');

exports.getSignUp = (req,res,next) => {
    res.render('auth/sign-up',{
        path: '/sign-up',
        pageTitle: "Sign Up"
    });
}

exports.postSignUp = (req,res,next) => {
const db = getDb();
db.collection('users').findOne({email: req.body.email})
.then(result => {
    if(result){
                return res.redirect("/sign-up");
            }
            return bcrypt.hash(req.body.password,12);
    })  
    .then(password => {
        return db.collection('users').insertOne({email: req.body.email,password});
    })
    .then(result => {
        console.log(result);
        res.redirect("/login");
    })
    .catch(err => {
        console.log(err);
    });

}
        



exports.getLogin = (req,res,next) => {
    res.render('auth/login',{
        path: "/login",
        pageTitle: "Login"
    });
}

exports.postLogin = (req,res,next) => {
    const db = getDb();
    res.render('auth/login',{
        path: "/login",
        pageTitle: "Login"
    });
}