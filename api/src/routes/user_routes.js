const express = require('express');
const userRouter = express.Router();
const audit = require('../middleware/audit');
const { celebrate } = require('celebrate');
const UserController = require('../controllers/user_controllers');
const UserValidator = require('../request_schemas/user_schema.js');
const check_user_exist = require('../middleware/check_user_exist');
const check_auth = require('../middleware/check-auth.js');
const check_role = require('../middleware/check_role.js');
const CONSTANT_ENUM = require('../helpers/constant_enums.js');

const API = {
  REGISTER_EMAIL_USER: '/register',
  GET_ALL_USERS: '/',
  GET_USER: '/:userID',
  SEND_OTP_ON_EMAIL: '/send/otp',
  VERIFY_OTP: '/verify/otp',
  UPDATE_EMAIL_PASSWORD: '/update/password',
  LOGIN_EMAIL: '/login',
  PROFILE_CREATE: '/profile/create/:userID',
  DELETE_USER: '/delete/:userID',
  DROP_COLLECTION: '/drop/asd123zxc',
  DECODE_TOKEN: '/token',
};

userRouter.post(
  API.REGISTER_EMAIL_USER,
  audit,
  celebrate(UserValidator.registerUserByEmail),
  UserController.registerUserByEmail
);

userRouter.get(API.DECODE_TOKEN, UserController.getUserFromToken);
// get users for admin
userRouter.get(
  API.GET_ALL_USERS,
  audit,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  UserController.getAllUsers
);
// get single user for admin
userRouter.get(
  API.GET_USER,
  audit,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  UserController.getUser
);

userRouter.put(
  API.SEND_OTP_ON_EMAIL,
  audit,
  celebrate(UserValidator.sendOtp),
  check_user_exist,
  UserController.sendOtpOnEmail
);
userRouter.put(
  API.VERIFY_OTP,
  audit,
  celebrate(UserValidator.verifiedOTP),
  UserController.verifyOTP
);

userRouter.put(
  API.UPDATE_EMAIL_PASSWORD,
  audit,
  celebrate(UserValidator.updateEmailPassword),
  check_user_exist,
  UserController.updateEmailPassword
);

userRouter.post(
  API.LOGIN_EMAIL,
  audit,
  celebrate(UserValidator.loginWithEmail),
  check_user_exist,
  UserController.loginWithEmail
);

userRouter.put(
  API.PROFILE_CREATE,
  audit,
  celebrate(UserValidator.createProfile),

  UserController.updateProfile
);

userRouter.put(
  API.DELETE_USER,
  audit,
  celebrate(UserValidator.deleteUser),
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  UserController.deleteUser
);

userRouter.get(API.DROP_COLLECTION, audit, UserController.dropUserCollection);

module.exports = userRouter;
