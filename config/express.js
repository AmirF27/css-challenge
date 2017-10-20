'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const passport = require('passport');
const path = require('path');

const config = require('./');

module.exports = (app) => {
  app.use(express.static(config.root + '/dist'));

  // Setup views
  app.set('views', path.join(__dirname, '../server/views'));
  app.set('view engine', 'hbs');

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Setup body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
