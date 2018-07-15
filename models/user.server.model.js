const mongoose = require('mongoose'),
      crypto = require('crypto'),
      Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    name: String,
    surname: String,
    password: String,
    job_title: String,
    department: String,
});

UserSchema.pre('save', function (next) {
        if(this.password){
            let md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }
        next();
    }
);

UserSchema.methods.authenticate = function (password) {
    let md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

UserSchema.statics.findUniqueUsername = (username, suffix, callback) => {
    let possibleUsername = username + (suffix || '');

    this.findOne(
        {username: possibleUsername},
        (err, user) => {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

mongoose.model('User', UserSchema);