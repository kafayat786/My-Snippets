const { Joi, Segments } = require('celebrate');
const CONSTANT_ENUM = require('../helpers/constant_enums');

const registerUserByEmail = {
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string().email().required('Email is required'),
      userName: Joi.string().required('User name is  required'),
      password: Joi.string().min(8).required().label('Password'),
      state: Joi.string().required('State is required'),
      country: Joi.string().required('Country is required'),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm Password'),
    })
    .options({
      messages: {
        'any.only': 'Passwords do not match with confirmPassword',
      },
    }),
};
const sendOtp = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required('Email is required'),
  }),
};

const validOTP = {
  [Segments.BODY]: Joi.object().keys({
    otp: Joi.string().required('OTP required'),
  }),
};

const verifiedOTP = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required('Email is required'),
    otp: Joi.string().required('OTP required'),
  }),
};

const updateEmailPassword = {
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required().label('Password'),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm Password'),
    })
    .options({
      messages: {
        'any.only': 'Passwords do not match with confirmPassword',
      },
    }),
};

const getAllUsers = {
  [Segments.HEADERS]: Joi.object()
    .keys({
      Authorization: Joi.string().required(),
    })
    .unknown(),
};

const verified = {
  [Segments.PARAMS]: Joi.object().keys({
    userID: Joi.string().required(),
  }),
};

const loginWithEmail = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const createProfile = {
  [Segments.BODY]: Joi.object().keys({
    userName: Joi.string().max(15).alphanum().required().label('String'),
    gender: Joi.string()
      .required()
      .valid(CONSTANT_ENUM.GENDER.MALE, CONSTANT_ENUM.GENDER.FEMALE),
  }),
};

const deleteUser = {
  [Segments.BODY]: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};

const UserValidator = {
  registerUserByEmail,
  validOTP,
  deleteUser,
  getAllUsers,
  verified,
  verifiedOTP,
  loginWithEmail,
  updateEmailPassword,
  createProfile,
  sendOtp,
};

module.exports = UserValidator;
