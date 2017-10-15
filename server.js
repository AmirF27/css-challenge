const express = require('express');

const app = express();

const DEFAULT_PORT = 3000;

require('dotenv').config();

require('./server/config/db');

const server = app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log(`Listening on port ${server.address().port}.`);
});
