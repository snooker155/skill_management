const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks.server.controller'),
      users = require('../controllers/users.server.controller');


/* GET tasks listing */
/* POST new task */
router.route('/')
      .get(users.requiresLogin, tasks.list)
      .post(users.requiresLogin, tasks.create);

/* GET target task */
/* PUT update target task */
/* DELETE target task */
router.route('/:taskId')
      .get(users.requiresLogin, tasks.read)
      .put(users.requiresLogin, tasks.update)
      .delete(users.requiresLogin, tasks.delete);

router.param('taskId', tasks.taskByID);

module.exports = router;