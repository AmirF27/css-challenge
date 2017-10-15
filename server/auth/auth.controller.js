'use strict';

const router = require('express').Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // this is temporary, will be changed to send a jwt token instead
    res.json({ message: 'success!' });
  });

module.exports = router;
