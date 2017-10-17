'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();

const config = require('../../../config');
const User = require('./user.model');

router.put('/challenge',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    req.user.addOrUpdateChallenge(req.body, (err) => {
      res.json(err || 'success');
    });
  });

module.exports = router;
