const config = require('./config'),
      mongoose = require('mongoose');

mongoose.set('debug', true);

module.exports = () => {
    const db = mongoose.connect(config.db);
    require('../models/user.server.model');
    require('../models/process.server.model');
    require('../models/task.server.model');
    require('../models/system.server.model');
    return db;
};