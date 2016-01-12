var express = require('express');
var router = express.Router();

//Separate the routing by users, events, invites
router.use('/users', require('./users.js'));
router.use('/events', require('./events.js'));
router.use('/invites', require('./invites.js'));

module.exports = router;