const express = require('express');
const router = express.Router();
const users = require('../controllers/users.server.controller');

router.route('/register').post(users.register);

router.route('/login').post(users.login);

router.get('/logout', users.logout);

module.exports = router;