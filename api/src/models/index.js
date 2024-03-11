const mongoose = require('mongoose');
const userSchema = require('./user_model');
const campaignSchema = require('./campaign_model');

const models = {
  Users: mongoose.model('users', userSchema),
  Campaigns: mongoose.model('campaigns', campaignSchema),
};
module.exports = models;
