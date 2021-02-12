const express = require('express');
const router = express.Router();
const systems = require('../controllers/systems.server.controller'),
    users = require('../controllers/users.server.controller');


/* GET systems listing */
/* POST new system */
router.route('/')
    .get(users.requiresLogin, systems.list)
    .post(users.requiresLogin, systems.create);

/* GET target system */
/* PUT update target system */
/* DELETE target system */
router.route('/:systemId')
    .get(users.requiresLogin, systems.read)
    .put(users.requiresLogin, systems.update)
    .delete(users.requiresLogin, systems.delete);

router.param('systemId', systems.systemByID);

module.exports = router;