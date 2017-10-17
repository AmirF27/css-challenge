'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const User = require('./user.model');

router.post('/challenge', (req, res) => {
  const authorization = req.headers.authorization.replace('Bearer ', '');
  const decoded = jwt.verify(authorization, config.auth.token.secret);

  User.addChallenge(decoded.sub, req.body, (err) => {
    res.json(err || 'success');
  });
});

module.exports = router;
