'use strict';

module.exports = {
  port: 3000,
  db: 'mongodb://localhost:27017',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }
};
