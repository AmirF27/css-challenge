'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();

const config = require('../../../config');
const User = require('./user.model');

router.post('/challenge',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    req.user.addChallenge(req.body, (err) => {
      res.json(err || 'success');
    });
  });

module.exports = router;
