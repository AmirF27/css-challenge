const express = require('express');
const passport = require('passport');

const app = express();

// Load environment variables
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const config = require('./server/config');

// Establish MongoDB connection
require('./server/config/db');

// Configure passport
require('./server/config/passport')(passport);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
