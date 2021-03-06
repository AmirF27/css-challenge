'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URL,
  auth: {
    token: {
      secret: process.env.AUTH_TOKEN_SECRET
    }
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://css-challenge.herokuapp.com/auth/github/callback'
  }
};
