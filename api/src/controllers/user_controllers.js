const { query } = require('express');
const config = require('../config/config');
const CONSTANT_ENUM = require('../helpers/constant_enums');
const MAIL_HANDLER = require('../mails/mails');
const UserServices = require('../services/user_services');
const { ErrorHandler } = require('../utils/error-handler');
const {
  randomNumberGenerate,
  areDatesSameIgnoringTime,
} = require('../utils/utils');
const { wrapAsync } = require('../utils/wrapAsync');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUserByEmail = async (req, res) => {
  const rq = res.locals.json_req;
  const { userName, email, password, country, state } = rq;
  const otp = randomNumberGenerate(5);
  let message = 'User registered successfully';
  let resp = null;

  const userExist = await UserServices.getUserByEmail(email);

  if (userExist) {
    throw new Error('User alredy exists');
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);
    resp = await UserServices.createUser({
      userName,
      email,
      password: encryptedPassword,
      otp,
      lastVisit: new Date(),
    });
    MAIL_HANDLER.sendEmailToUserWithOTP(email, otp);
    message = 'OTP send on email';
  }

  return res.json({
    data: {
      userID: resp._id,
      otp: resp.otp,
    },
    message,
  });
};
const loginWithEmail = async (req, res) => {
  const rq = res.locals.json_req;
  const { password } = rq;
  const { userExist } = req;

  if (!userExist)
    throw new ErrorHandler(400, 'User Not Exist. Please Register yourself');

  if (!userExist?.password) throw new Error('Password missing');

  const isMatch = await bcrypt.compare(password, userExist?.password);

  if (!isMatch) throw new ErrorHandler(400, 'Incorrect password');

  const token = jwt.sign(
    { userID: userExist?._id },
    config.server.jwtSecretKey,
    {
      expiresIn: '72h',
    }
  );

  return res.status(200).json({
    data: {
      user: userExist,
      token,
    },
    message: 'User logged in successfully',
  });
};

const sendOtpOnEmail = async (req, res) => {
  const rq = res.locals.json_req;
  const { email } = rq;
  const otp = randomNumberGenerate(5);

  const resp = await UserServices.updateUserByEmail(email, { otp });
  MAIL_HANDLER.sendEmailToUserWithOTP(email, otp);

  return res.json({
    data: {
      userID: resp._id,
      otp: resp.otp,
    },
    message: 'OTP send to email',
  });
};

const verifyOTP = async (req, res) => {
  const rq = res.locals.json_req;
  const { otp, email } = rq;

  const userExist = await UserServices.getUser({ email, otp });

  if (userExist) {
    UserServices.updateUserByID(userExist._id, {
      otp: '',
      isVerified: true,
    });
  } else {
    throw new ErrorHandler(300, 'Invalid data');
  }
  return res.json({ message: 'Account verified successfully' });
};

const updateEmailPassword = async (req, res) => {
  const rq = res.locals.json_req;
  const { password } = rq;
  const { userExist } = req;
  let resp = null;

  if (userExist) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    resp = await UserServices.updateUserByID(userExist._id, {
      password: encryptedPassword,
    });
  } else {
    throw new Error('User not exist with this email');
  }

  return res.json({ data: resp, message: 'Record updated successfully' });
};

const updateProfile = async (req, res) => {
  const rq = res.locals.json_req;
  const { _id, ...rest } = rq;
  const { userID } = req.params;

  const userExist = await UserServices.getUserByID(userID);

  if (!userExist) throw new Error('User not exist');

  const resp = await UserServices.updateUserByID(userID, rest);

  return res.json({
    data: resp,
    message: 'Record updated successfully',
  });
};

const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, role, searchTerm } = req.body;

  let query = { isDeleted: false };
  if (role) {
    query.role = role;
  }
  if (searchTerm) {
    query = {
      ...query,
      $or: [{ userName: { $regex: searchTerm, $options: 'i' } }],
    };
  }
  console.log({ query });
  const users = await UserServices.getAllUsers(query, page, limit);

  return res.json({
    data: users,
    message: 'Users found successfully',
  });
};

const getUser = async (req, res) => {
  const { userID } = req.params;
  const resp = await UserServices.getUserByID(userID);

  return res.json({
    data: resp,
    message: 'User found successfully',
  });
};

const deleteUser = async (req, res) => {
  const rq = res.locals.json_req;
  const { status } = rq;
  const { userID } = req.params;

  const user = await UserServices.updateUserByID(userID, {
    isDeleted: status,
    deleteDate: new Date(),
  });

  return res.status(200).json({ data: user, message: 'User deleted' });
};

const dropUserCollection = async (req, res) => {
  const resp = await UserServices.dropUserCollection();

  return res.status(200).json({
    data: resp,
    message: 'Collection drop successfully',
  });
};

const getUserFromToken = async (req, res) => {
  const { token } = req.body;
  let newData = { lastVisit: new Date() };

  if (!token) throw new Error('Token not found');

  const decode = jwt.verify(token, config.server.jwtSecretKey);

  const userExist = await UserServices.getUserByID(decode._id);
  w;
  if (!userExist) throw new Error('User not found');

  const beaconObj = await BeaconServices.getUserBeacon(userExist._id);

  const oldMonth = new Date(beaconObj.month).getMonth();
  const newMonth = new Date().getMonth();

  if (oldMonth !== newMonth) {
    BeaconServices.updateBeacon(beaconObj, {
      beacons: 10,
      month: new Date(),
    });
  }

  const oldDate = new Date(userExist.lastVisit).getTime();
  const newDate = new Date().getTime();

  if (areDatesSameIgnoringTime(oldDate, newDate)) {
    newData.swipes = 30;
  }

  const resp = await UserServices.updateUserByID(userExist._id, {
    ...newData,
  });

  return res.status(200).json({
    data: resp,
    message: 'Record found',
  });
};

const UserController = {
  registerUserByEmail: wrapAsync(registerUserByEmail),
  sendOtpOnEmail: wrapAsync(sendOtpOnEmail),
  verifyOTP: wrapAsync(verifyOTP),
  updateEmailPassword: wrapAsync(updateEmailPassword),
  loginWithEmail: wrapAsync(loginWithEmail),
  updateProfile: wrapAsync(updateProfile),
  getAllUsers: wrapAsync(getAllUsers),
  getUser: wrapAsync(getUser),
  deleteUser: wrapAsync(deleteUser),
  dropUserCollection: wrapAsync(dropUserCollection),
  getUserFromToken: wrapAsync(getUserFromToken),
};

module.exports = UserController;
