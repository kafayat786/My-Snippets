const mongoose = require('mongoose');
const CONSTANT_ENUM = require('../helpers/constant_enums');

const campaignSchema = new mongoose.Schema(
  {
    title: String,
    campaignOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    description: String,
    photo: String,
    status: {
      type: String,
      enum: [
        CONSTANT_ENUM.STATUS.PENDING,
        CONSTANT_ENUM.STATUS.ACTIVE,
        CONSTANT_ENUM.STATUS.FLAGGED,
        CONSTANT_ENUM.STATUS.REJECTED,
      ],
      default: CONSTANT_ENUM.STATUS.PENDING,
    },
    donationTarget: String,
    country: String,
    state: String,
    email: String,
    phone: String,
  },

  { timestamps: true }
);

module.exports = campaignSchema;
