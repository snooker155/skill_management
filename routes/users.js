const express = require('express');
const router = express.Router();
const users = require('../controllers/users.server.controller');

/* GET users listing */
/* POST new user */
router.route('/api/users').get(users.list).post(users.create);

/* GET target user */
/* PUT update target user */
/* DELETE target user */
router.route('/api/users/:userId').get(users.read).put(users.update).delete(users.delete);

router.param('userId', users.userByID);

module.exports = router;
