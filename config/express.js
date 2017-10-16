'use strict';

const passport = require('passport');
const path = require('path');

module.exports = (app) => {
  // Setup views
  app.set('views', path.join(__dirname, '/server/views'));
  app.set('view engine', 'hbs');

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
};
