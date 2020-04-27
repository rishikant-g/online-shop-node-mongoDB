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
    const db = getDb();
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login"
    });
}