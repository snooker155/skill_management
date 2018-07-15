const express = require('express');
const router = express.Router();
const users = require('../controllers/users.server.controller');


/* GET users listing */
/* POST new user */
router.route('/').get(users.requiresLogin, users.list).post(users.requiresLogin, users.create);

/* GET target user */
/* PUT update target user */
/* DELETE target user */
router.route('/:userId').get(users.requiresLogin, users.read).put(users.requiresLogin, users.update).delete(users.requiresLogin, users.delete);

router.param('userId', users.userByID);

module.exports = router;
