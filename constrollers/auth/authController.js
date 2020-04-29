const crypto = require('crypto');
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator/check');
const sendGridTranportor = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTranportor({
    auth:{
        api_key: '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'
    }

}));


exports.getSignUp = (req, res, next) => {
    res.render('auth/sign-up', {
        path: '/sign-up',
        pageTitle: "Sign Up",
        errorMessage: undefined,
        oldValue: {name:'',email: ''},
        validationErrors : []
    });
}

exports.postSignUp = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()){
        return res.status(422).render('auth/sign-up', {
            path: '/sign-up',
            pageTitle: "Sign Up",
            errorMessage: errors.array()[0].msg,
            oldValue: {email: req.body.email, name: req.body.name},
            validationErrors : errors.array()
        });
    }
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
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else{
        message = null;
    }
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login",
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(!user){
                console.log('user does not exist');
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
                console.log(err);
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

exports.getReset = (req,res,next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = req.flash('error')[0];
    }else{
        message = null;
    }
    res.render('auth/reset-password',{
        path: '/reset-password',
        pageTitle: 'Reset Password',
        errorMessage: message
        
    });
}
exports.postReset = (req,res,next) => {

    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                req.flash('error','User not found');
                return res.redirect('/reset-password');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now()+3600000;
            return user.save();
        })
        .then(result => {
            transporter.sendMail({
                to: req.body.email,
                from: 'rishikant.npnp@gmail.com',
                subject: 'Reset password link',
                html: `
                <p>Your requested to reset you password</p>
                <p> <a href="http://127.0.0.1:3000/reset/${token}">click here</a>`,
            })
            .then(() => {
                return res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            })
           
        }) 
        .catch(err => {
            console.log(err);
        });
    });
   
}

exports.getNewPassword = (req,res,next) => {
 User.findOne({resetToken: req.params.token, resetTokenExpiration: { $gt: Date.now() }})
 .then(user => {
     if(!user){
         req.flash('error','Link expired');
         return redirect('/login');
     }
     res.render('auth/new-password',{
        path: '/new-password',
        pageTitle: 'New Password',
        userId: user._id,
        resetToken: user.resetToken,
        email: user.email
    });
 })
 .catch(err => {
     console.log(err);
 });   
}

exports.postNewPassword = (req,res,next) => {
    User.findOne({email: req.body.email, _id: req.body.userId,resetToken:{$gt: Date.now()}})
    .then(user => {
        if(!user){
            req.flash('error','User not found');
            return res.redirect('/login');
        }
         bcrypt.hash(req.body.password,12)
        .then(password => {
            user.password = password;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
           return user.save();
        })
        .then(result => {
            return res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    });
}