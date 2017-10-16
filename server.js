'use strict';

const express = require('express');

const app = express();

// Load environment variables
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const config = require('./config');

// Establish MongoDB connection
require('./config/db');

// Configure app
require('./config/express')(app);
require('./config/passport');

// Setup routes
app.use(require('./config/routes'));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
