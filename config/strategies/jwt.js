const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy, // авторизация через JWT
      ExtractJwt = require('passport-jwt').ExtractJwt, // авторизация через JWT
      config = require('../config'),
      User = require('mongoose').model('User');


// Ждем JWT в Header
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtsecret
};

module.exports = () => {
    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
            User.findById(payload.id, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }

                return done(null, user);
            })
        })
    )
};