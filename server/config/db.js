'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useMongoClient: true }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Successfully connected to MongoDB.');
});
