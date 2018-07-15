const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne(
            {username: username},
            (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {message: 'Invalid password'});
                }

                return done(null, user, {message: 'Logged In Successfully'});
            }
        );
    }));
};