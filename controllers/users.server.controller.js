const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken'); // аутентификация по JWT для http
const config = require('../config/config');
const passport = require('passport');


const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderLogin = (req, res, next) => {
    if(!req.user){
        res.render('login', {
            title: 'Login Form',
            messages: req.flash('error') || req.flash('info')
        });
    }else{
        return res.redirect('/');
    }
};

exports.renderRegister = (req, res, next) => {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.register = (req, res, next) => {
    if (!req.user) {
        let user = new User(req.body);
        user.provider = 'local';
        user.save((err) => {
            if (err) {
                let message = getErrorMessage(err);
                // req.flash('error', message);
                // return res.redirect('/register');
                return res.json(message);
            }else{
                return res.json('New user has been created');
            }

            // req.login(user, (err) => {
            //     if (err)
            //         return next(err);
            //
            //     return res.redirect('/');
            // });
        });
    }
    else {
        return res.redirect('/');
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        // successRedirect: '/',
        // failureRedirect: '/login',
        // failureFlash: true
        session: false,
    }, (err, user, message) => {
        if (err || !user) {
            // let message = getErrorMessage(err);
            // req.flash('error', message);
            // return res.redirect('/register');
            return res.status(400).json({
                message: message,
                error: err
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            //--payload - информация которую мы храним в токене и можем из него получать
            const payload = {
                id: user._id,
                username: user.username,
            };
            const token = jwt.sign(payload, config.jwtsecret); //здесь создается JWT
            return res.json({user: user.name, token: token});
        });
    })(req, res)
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};


exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save(function (err) {
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    });
};

exports.list = (req, res, next) => {
    User.find({}, (err, users) => {
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    })
};

exports.read = (req, res) => {
    res.json(req.user);
};

exports.userByID = (req, res, next, id) => {
    User.findOne({
            _id: id
        },
        (err, user) => {
            if(err){
                next(err);
            }else{
                req.user = user;
                next();
            }
        }
    )
};

exports.update = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    })
};

exports.delete = (req, res, next) => {
    req.user.remove((err) => {
        if(err){
            return next(err);
        }else{
            res.json(req.user);
        }
    })
};

exports.requiresLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};