const express = require('express');
const router = express.Router();
const processes = require('../controllers/processes.server.controller'),
      users = require('../controllers/users.server.controller');


/* GET processes listing */
/* POST new process */
router.route('/')
      .get(users.requiresLogin, processes.list)
      .post(users.requiresLogin, processes.create);

/* GET target process */
/* PUT update target process */
/* DELETE target process */
router.route('/:processId')
      .get(users.requiresLogin, processes.read)
      .put(users.requiresLogin, processes.update)
      .delete(users.requiresLogin, processes.delete);

router.param('processId', processes.processByID);

module.exports = router;