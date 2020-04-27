const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');

exports.getSignUp = (req, res, next) => {
    res.render('auth/sign-up', {
        path: '/sign-up',
        pageTitle: "Sign Up"
    });
}

exports.postSignUp = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(result => {
            if (result) {
                console.log("email already taken");
                return res.redirect("/sign-up");
            }
            bcrypt.hash(req.body.password, 12)
                .then(password => {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password
                    })
                    user.save();
                })
                .then(() => {
                    return res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login"
    });
}

exports.postLogin = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(!user){
                console.log("email does not exist");
                return res.redirect("/login");
            }
            bcrypt.compare(req.body.password, user.password)
            .then(isValidUserAndPassword => {
                if (isValidUserAndPassword) {
                    req.session.isLogin = true;
                    req.session.user = user;
                   return req.session.save(err => {
                        console.log(err);
                        res.redirect('/admin/products');
                    });
                    
                }
                console.log("invalid credentials");
                res.redirect('/login');
            })
            .catch(err => {
                console.log("Invalid Password");
            });
        })
        .catch(err => {
            console.log(err);
        });
}