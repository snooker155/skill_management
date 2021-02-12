const passport = require('config/passport'),
      mongoose = require('mongoose');

module.exports = () => {
    const User = mongoose.model('User');

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne(
            {_id: id},
            '-password',
            (err, user) => {
                done(err, user);
            }
        );
    });

    require('./strategies/local.js')();
    require('./strategies/jwt.js')();
};