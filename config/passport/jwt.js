'use strict';

const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const config = require('../');
const User = require('../../server/api/user/user.model');

module.exports = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.token.secret
  },
  (payload, done) => {
    User.findById(payload.sub, (err, user) => {
      if (err || !user) { return done(err); }

      return done(null, user, payload);
    });
  });
