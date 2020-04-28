const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendGridTranportor = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTranportor({
    auth:{
        api_key: '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'
    }

}));


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
                  return user.save();
                })
                .then((result) => {
                    res.redirect('/login');
                     transporter.sendMail({
                        to: req.body.email,
                        from: 'rishikant.npnp@gmail.com',
                        subject: 'Sign up succeeded',
                        html: '<h1>Sign up done </h1>'
                    })
                    .then(result => {
                        console.log('mail send');
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login",
        errorMessage: req.flash('error')
    });
}

exports.postLogin = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(!user){
                req.flash('error','User does not exist');
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
                req.flash('error','Invalid password');
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

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login');
    });
}