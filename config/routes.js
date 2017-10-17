'use strict';

const router = require('express').Router();

router.use('/auth', require('../server/auth/auth.controller'));

router.use('/api/user', require('../server/api/user/user.controller'))

module.exports = router;
