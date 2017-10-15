'use strict';

const router = require('express').Router();
const passport = require('passport');

router.use('/auth', require('../server/auth/auth.controller'));

module.exports = router;
