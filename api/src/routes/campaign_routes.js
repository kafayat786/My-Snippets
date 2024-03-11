const express = require('express');
const campaignRouter = express.Router();
const audit = require('../middleware/audit');
const { celebrate } = require('celebrate');
const CampaignController = require('../controllers/campaign_controllers.js');
const UserValidator = require('../request_schemas/user_schema.js');
const check_user_exist = require('../middleware/check_user_exist');
const check_auth = require('../middleware/check-auth.js');
const check_role = require('../middleware/check_role.js');
const CONSTANT_ENUM = require('../helpers/constant_enums.js');

const API = {
  DELETE_CAMPAIGN: '/delete/:campaignId',
  UPDATE_CAMPAIGN: '/update/:campaignId',
  GET_ALL_CAMPAIGNS: '/',
  GET_CAMPAIGN: '/:campaignId',
};

// get users for admin
campaignRouter.get(
  API.GET_ALL_CAMPAIGNS,
  audit,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  CampaignController.getAllCampaigns
);
// get single user for admin
campaignRouter.get(
  API.GET_CAMPAIGN,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  CampaignController.getCampaign
);
campaignRouter.put(
  API.UPDATE_CAMPAIGN,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  CampaignController.updateCampaign
);
campaignRouter.delete(
  API.DELETE_CAMPAIGN,
  check_auth,
  check_role(CONSTANT_ENUM.USER_ROLE.ADMIN),
  CampaignController.deleteCampaign
);

module.exports = campaignRouter;
