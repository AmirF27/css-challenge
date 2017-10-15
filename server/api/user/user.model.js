'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  github: {
    id: { type: String, required: true, index: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true }
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
