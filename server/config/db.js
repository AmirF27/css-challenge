'use strict';

const mongoose = require('mongoose');

const config = require('./');

mongoose.connect(config.db, { useMongoClient: true }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Successfully connected to MongoDB.');
});
