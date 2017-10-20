'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  github: {
    id: { type: Number, required: true, index: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true }
  },
  settings: {
    appearOnLeaderboard: { type: Boolean, default: true },
    profileVisible: { type: Boolean, default: true }
  },
  challengesCompleted: [{
    _id: false,
    id: { type: Number, required: true, index: true },
    title: { type: String, required: true },
    links: {
      code: { type: String, required: true },
      live: { type: String, required: true }
    },
    date: { type: Date, default: Date.now }
  }]
});

userSchema.index({ 'github.username': 'text' });

Object.assign(userSchema.statics, {
  findByUsername(username, callback) {
    this
      .findOne({ $text: { $search: username } })
      .exec(callback);
  },

  getLeaderboard(callback) {
    this.aggregate([
      { $match: { 'settings.appearOnLeaderboard': true } },
      { $project: {
        _id: 0,
        username: '$github.username',
        challengeCount: { $size: '$challengesCompleted' }
      } },
      { $sort: { challengeCount: -1 } }
    ]).exec(callback);
  }
});

Object.assign(userSchema.methods, {
  updateSettings(settings, callback) {
    this
      .update({ $set: { settings } })
      .exec(callback);
  },

  addOrUpdateChallenge(challenge, callback) {
    const index = this.getChallengeIndex(challenge);

    if (index >= 0) {
      this.updateChallengeByIndex(index, challenge, callback);
    } else {
      this.addChallenge(challenge, callback);
    }
  },

  addChallenge(challenge, callback) {
    this
      .update({ $push: { challengesCompleted: challenge } })
      .exec(callback);
  },

  updateChallengeByIndex(index, challenge, callback) {
    const links = `challengesCompleted.${index}.links`;

    this.update({
      $set: {
        [`${links}.code`]: challenge.links.code,
        [`${links}.live`]: challenge.links.live
      }
    }).exec(callback);
  },

  getChallengeIndex(challenge) {
    return this.challengesCompleted
      .findIndex((ch) => ch.id === challenge.id);
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
