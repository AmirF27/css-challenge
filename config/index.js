'use strict';

const envs = {
  development: require('./env/development'),
  production: require('./env/production')
};

module.exports = envs[process.env.NODE_ENV || 'development'];
