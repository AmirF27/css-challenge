'use strict';

const path = require('path');

const defaults = {
  root: path.join(__dirname, '../')
};

const envs = {
  development: Object.assign({}, require('./env/development'), defaults),
  production: Object.assign({}, require('./env/production'), defaults)
};

module.exports = envs[process.env.NODE_ENV || 'development'];
