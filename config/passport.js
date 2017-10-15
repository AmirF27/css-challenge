'use strict';

const passport = require('passport');

const githubStrategy = require('./passport/github');
const User = require('../server/api/user/user.model');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

passport.use(githubStrategy);
