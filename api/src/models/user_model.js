const mongoose = require("mongoose");
const CONSTANT_ENUM = require("../helpers/constant_enums");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    platform: {
      type: String,
      enum: [
        CONSTANT_ENUM.PLATFORMS.FACEBOOK,
        CONSTANT_ENUM.PLATFORMS.GMAIL,
        CONSTANT_ENUM.PLATFORMS.APPLE,
        CONSTANT_ENUM.PLATFORMS.EMAIL,
        CONSTANT_ENUM.PLATFORMS.PHONE,
      ],
    },
    role: {
      type: String,
      enum: [
        CONSTANT_ENUM.USER_ROLE.ADMIN,
        CONSTANT_ENUM.USER_ROLE.BUYER,
        CONSTANT_ENUM.USER_ROLE.CUSTOMER,
        CONSTANT_ENUM.USER_ROLE.FUNDRAISER,
      ],
    },
    gender: {
      type: String,
      enum: [CONSTANT_ENUM.GENDER.MALE, CONSTANT_ENUM.GENDER.FEMALE],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    country: String,
    state: String,
    password: String,
    facebookID: String,
    gmailID: String,
    appleID: String,
    lastVisit: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
