'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URL,
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }
};
