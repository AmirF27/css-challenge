'use strict';

const passport = require('passport');

const User = require('../server/api/user/user.model');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

passport.use(require('./passport/jwt'));
passport.use(require('./passport/github'));
