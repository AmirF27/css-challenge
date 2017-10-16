'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../../config');

const generateAccessToken = (req, res) => {
  const token = jwt.sign({}, config.auth.token.secret, {
    expiresIn: '7d',
    subject: req.user.id
  });

  res.render('authenticated', { token });
};

router.get('/github',
  passport.authenticate('github', { session: false }));

router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  generateAccessToken);

module.exports = router;
