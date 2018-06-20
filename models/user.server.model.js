const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    job_title: String,
    department: String,
});

mongoose.model('User', UserSchema);