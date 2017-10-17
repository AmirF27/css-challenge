'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  github: {
    id: { type: Number, required: true, index: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true }
  },
  challengesCompleted: [{
    _id: false,
    id: { type: Number, require: true },
    links: {
      code: { type: String, required: true },
      live: { type: String, required: true }
    },
    date: { type: Date, default: Date.now }
  }]
});

Object.assign(userSchema.methods, {
  addChallenge(challenge, callback) {
    this
      .update({ $push: { challengesCompleted: challenge } })
      .exec(callback);
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
