'use strict';

const githubStrategy = require('./passport/github');
const User = require('../server/api/user/user.model');

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id, done));

  passport.use(githubStrategy);
};
