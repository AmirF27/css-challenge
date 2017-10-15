const express = require('express');

const config = require('./server/config');

const app = express();

require('dotenv').config();

require('./server/config/db');

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${server.address().port}.`);
});
