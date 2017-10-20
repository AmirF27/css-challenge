'use strict';

const router = require('express').Router();

const config = require('./');

router.use('/auth', require('../server/auth/auth.controller'));

router.use('/api/user', require('../server/api/user/user.controller'));

// Catch all route for delegating routing to the client side
router.get('*', (req, res) => {
  res.sendFile(config.root + '/dist/index.html');
});

module.exports = router;
