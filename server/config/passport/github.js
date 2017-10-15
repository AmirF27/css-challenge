'use strict';

const GitHubStrategy = require('passport-github').Strategy;

const config = require('../');
const User = require('../../user/user.model');

module.exports = new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'github.id': profile.id }, (err, user) => {
      if (err) return done(err);

      if (user) return done(null, user);

      const newUser = new User({
        github: {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName
        }
      });

      newUser.save((err) => {
        if (err) return done(err);

        return done(null, newUser);
      });
    });
  }
);
